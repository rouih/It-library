import { Router } from "express";
import BookRoutes from "./book.routes";

const router: Router = Router();

router.use("/books", BookRoutes);

export default router;
