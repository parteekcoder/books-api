import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    summary:{
        type: String,
    }

},{timestamps:true});

export default mongoose.model('Books',bookSchema)
