import bookRouter from "./book/index.js";
import express from "express";
const router = express.Router();

router.use('/book',bookRouter);

export default router;