import { connect } from "nats"
import UserModel from "../Models/User.model.js";
import TaskModel from "../Models/Task.model.js";

// const natsOptions = {
//     servers: ['nats://localhost:4222']
// };

// let natsConnection;

// const publishEvent = async (subject, data) => {
//     if(!natsConnection){
//         natsConnection = await connect(natsOptions);
//         console.log('Connect to NATS server.');
//     }

//     try{
//         natsConnection.publish(subject,data);
//         console.log('Event published successfully');
        
//     }
// }
export const CreateTask = async (req,res) => {
    try{
        const {title,adminId,description, priority, dueDate} = req.body;
        
        const isAdmin = await UserModel.findOne({_id:adminId, type:'admin'});
        if(!isAdmin) return res.status(404).json({error:'Admin not found'});

        const newTask = new TaskModel({title, description, priority, dueDate});
        await newTask.save();

        res.status(201).json({success:true, newTask});
    }catch(error){
        return res.status(500).json({ success: false, error: error })
    }

}

export const UpdateTask = async (req, res) => {
    try {
        const { id, title, description, priority, dueDate, adminId } = req.body;

        const isAdmin = await UserModel.findOne({ _id: adminId, type: "admin" })
        if (!isAdmin) return res.status(401).json({ error: "Admin not found." })

        const updatedTask = await TaskModel.findByIdAndUpdate(id, { title, description, priority, dueDate }, { new: true });

        res.status(201).json({ success: true, updatedTask });

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

export const SortSearch = async (req, res) => {
    try {

        const {searchQuery, sortBy } = req.body;
        const adminId = req.headers.adminid;
        // return res.json({headers: req.headers.adminid});

        const isAdmin = await UserModel.findOne({ _id: adminId, type: "admin" })
        if (!isAdmin) return res.status(401).json({ error: "Admin not found." })

        const query = {};
        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        let sort = {};
        switch (sortBy) {
            case 'completionStatus':
                sort.completed = 1;
                break;
            case 'dueDate':
                sort.dueDate = 1;
                break;
            case 'priority':
                sort.priority = 1;
                break;
            default:
                sort.createdAt = -1;
                break;
        }

        const tasks = await TaskModel.find(query).sort(sort);

        res.status(201).json({ success: true, tasks });

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

export const ReadOwnTasks = async (req, res) => {
    try {
        const  userId  = req.headers.userid;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const userTasks = await TaskModel.find({ userId: userId });

        res.status(201).json({ success: true, userTasks });

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

export const MarkTaskAsComplete = async (req, res) => {
    try {
        const { userId, taskId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const task = await TaskModel.findOne({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({ error: "Task not found or does not belong to the user." });
        }

        task.completed = true;
        await task.save();

        const eventData = {
            userId: userId,
            taskId: taskId,
            completedAt: new Date(),
        };

        await publishEvent('TASK_COMPLETED', JSON.stringify(eventData));

        res.status(201).json({ success: true, task });

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

export const AssignTaskToUser = async (req, res) => {
    try {
        const { adminId, taskId, assignedUserId } = req.body;

        const isAdmin = await UserModel.findOne({ _id: adminId, type: "admin" });
        if (!isAdmin) {
            return res.status(401).json({ error: "Admin not found." });
        }

        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        const assignedUser = await UserModel.findById(assignedUserId);
        if (!assignedUser) {
            return res.status(404).json({ error: "Assigned user not found." });
        }

        task.userId = assignedUserId;
        await task.save();

        res.status(200).json({ success: true, task });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const CompleteTask = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        if (!taskId || !userId) {
            return res.status(400).json({ error: 'Invalid request. Both taskId and userId are required.' });
        }
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId },
            { completed: true },
            { new: true, useFindAndModify: false }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'User not belong to task or Task not found' });
        }

        // const completedTaskEvent = {
        //     eventType: 'TASK_COMPLETED',
        //     taskId: taskId,
        //     userId: userId,
        //     completedAt: new Date().toISOString()
        // };
        // try {
        //     await publishEvent('TASK_COMPLETED', JSON.stringify(completedTaskEvent));
        // } catch (error) {
        //     console.error('Error publishing event:', error);
        // }
        res.status(201).json({ success: true, message: 'Task marked as complete', task: updatedTask });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}