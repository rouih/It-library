import { Router } from "express";
import BookRoutes from "./book.routes";
import LoanRoutes from "./loan.routes"

const router: Router = Router();

router.use("/books", BookRoutes);
router.use("/loans", LoanRoutes)

export default router;
