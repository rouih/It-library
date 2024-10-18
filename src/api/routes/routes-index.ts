import { Router } from "express";
import BookRoutes from "./book.routes";
import LoanRoutes from "./loan.routes"
import UserRouts from "./user.routes";
const router: Router = Router();

router.use("/books", BookRoutes);
router.use("/loans", LoanRoutes);
router.use("/users", UserRouts);

export default router;
