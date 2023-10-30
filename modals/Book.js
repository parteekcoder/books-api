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
bookSchema.index({title:1,author:1},{unique:true})
export default mongoose.model('Books',bookSchema)
