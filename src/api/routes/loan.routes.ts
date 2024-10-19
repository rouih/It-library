import { Router } from "express";
import { container } from '../../config/container.config';
import { LoanController } from "../controllers/loan/loan-controller-index";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateLoanDto, ReturnBookDto } from "../../dtos/loan.dto";
import { authMiddleware } from "../../utils/middlewares/auth.middleware";
import { authorizeRole } from "../../utils/middlewares/roleAuth.middleware";
import { UserRole } from "../../types/user.type";
const router = Router();

const loanController = container.resolve(LoanController);

router.post("/", validateDto(CreateLoanDto), async (req, res, next) => loanController.loanBook(req, res, next));

router.post("/return", validateDto(ReturnBookDto), (req, res, next) => loanController.returnBook(req, res, next));
router.get("/allLoans", authMiddleware, authorizeRole(UserRole.EMPLOYEE), (req, res, next) => loanController.getAllLoans(req, res, next));
router.get("/:id", (req, res, next) => loanController.getLoansByUser(req, res, next));

export default router;