import express from "express";
import router from "./Routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', router);

app.listen(8001, ()=>{console.log('listening on port 8001')});

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('database connected')});