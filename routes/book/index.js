import express from "express";
import { createBook, deleteBookByID, getBookByID, updateBookByID } from "../../controllers/book";

const router = express.Router();

router.get('/:id', getBookByID);
router.post('/',createBook);
router.put('/:id',updateBookByID);
router.delete('/:id',deleteBookByID);


export default router;