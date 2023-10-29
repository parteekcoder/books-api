import bookRouter from "./book";

const router = express.Router();

router.use('/book',bookRouter);

export default router;