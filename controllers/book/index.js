import Book from "../../modals/Book.js";
import createError from "../../utilites/error_handler/index.js";
import sendResponse from "../../utilites/helper/index.js";
import { isValidObjectId } from "mongoose";

const updateQuery = (updateObject, query, value) => {
    if(value){
        updateObject = {
            ...updateObject,
            [query]:value,
        }
    }
    return updateObject;
}
const getBookByID = async (req,res, next) => {
    try {
        const bookID = req.params.id;

        if(!isValidObjectId(bookID)){
            next(createError(400,'Please Provide a valid book id.'));
        }

        const book = await Book.findOne({_id:bookID});
        if(!book) {
            return next(createError(404,'Book with the given ID not found. Please provide the correct id.'));
        }

        return sendResponse(res,true,200,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}
const createBook = async (req,res, next) => {
    try {
        const { title, author, summary }= req.body;
        if(!title || typeof title !=='string') { // to prevent NoSQL injection
            next(createError(400,'Book title not provided'));
        }
        if(!author || typeof author !=='string') {
            next(createError(400,'Book Author not provided'));
        }

        const book = new Book({title, author, summary});
        await book.save();

        return sendResponse(res,true,201,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}
const updateBookByID = async (req,res,next) => {
    try {
        const bookID = req.params.id;
        const { title, author, summary }= req.body;
        if(!bookID) {
            next(createError(400,'Book id not provided'));
        }
        let updateObject = {};
        updateObject = updateQuery(updateObject, 'author',author )
        updateObject = updateQuery(updateObject, 'title',title )
        updateObject = updateQuery(updateObject, 'summary',summary )

        const book = await Book.findByIdAndUpdate(bookID,updateObject,{new:true});
        
        return sendResponse(res,true,200,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}
const deleteBookByID = async (req,res,next) => {
    try {
        const bookID = req.params.id;

        if(!bookID) {
            next(createError(400,'Book id not provided'));
        }
        const book = await Book.deleteOne({_id:bookID});
        if(book.deletedCount==1){
            return sendResponse(res,true,200,"Successfully Deleted");
        }
        return sendResponse(res,false,404,"No book exist with this ID.");

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}

export {getBookByID,createBook,updateBookByID,deleteBookByID}