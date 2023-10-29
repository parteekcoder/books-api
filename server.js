import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";


import router from './routes'
import sendResponse from "./utilites/helper";

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Initializing env variables
dotenv.config();

app.use('/',router)
app.use('/*',(req,res) => {
    return res.status(400).json({status:false,message:"this route doesnot exist"});
})
app.use((err,req,res,next)=>{
    // we can use datadog logger or any other logger here to create logs for failed API request

    return sendResponse(res,false,err.status,err.message);
})
const connectDB = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI+ (process.env.NODE_ENV === 'test'?'likesApi-test':'likesApi'),{
            useNewURLParser:true,
            useUnifiedTopology:true
        })
        app.listen(process.env.PORT,() => {
            console.log('server started at ' + process.env.PORT + '...');
            console.log('server started in '+process.env.NODE_ENV +' mode' )
        });
    } catch (error) {
        console.log(error);
    }
}

connectDB();

export default app;