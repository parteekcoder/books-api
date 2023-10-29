import Book from "../../modals/Book";
import createError from "../../utilites/error_handler";
import sendResponse from "../../utilites/helper";

const updateQuery = (updateObject, query, value) => {
    if(value){
        updateObject = {
            ...updateObject,
            [query]:value,
        }
    }
    return updateObject;
}
const getBookByID = async (req,res) => {
    try {
        const bookID = req.params.id;
        if(!bookID) {
            next(createError(400,'Book id not provided'));
        }

        const book = await Book.findById(bookID);
        if(!book) {
            next(createError(404,'Book with the given ID not found. Please provide the correct id.'));
        }

        return sendResponse(res,200,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}
const createBook = async (req,res) => {
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

        return sendResponse(res,201,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}
const updateBookByID = async (req,res) => {
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

        const book = await Book.findByIdAndUpdate(bookID,updateObject);
        
        return sendResponse(res,200,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}
const deleteBookByID = async (req,res) => {
    try {
        const bookID = req.params.id;

        if(!bookID) {
            next(createError(400,'Book id not provided'));
        }
        const book = await Book.findByIdAndDelete(bookID);

        return sendResponse(res,200,book);

    } catch (error) {
        next(createError(500,'Server Error'));
    }
}

export {getBookByID,createBook,updateBookByID,deleteBookByID}