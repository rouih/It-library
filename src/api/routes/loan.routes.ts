import { Router } from "express";
import { container } from '../../config/container.config';
import { LoanController } from "../controllers/loan/loan-controller-index";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateLoanDto, ReturnLoanDto } from "../../dtos/loan.dto";
import { authMiddleware } from "../../utils/middlewares/auth.middleware";
const router = Router();

const loanController = container.resolve(LoanController);

router.post("/", validateDto(CreateLoanDto), async (req, res, next) => loanController.loanBook(req, res, next));

router.post("/return", validateDto(ReturnLoanDto), (req, res, next) => loanController.returnBook(req, res, next));
router.get("/loaned", (req, res, next) => loanController.getLoanedBooks(req, res, next));
router.get("/loans", (req, res, next) => loanController.getAllLoans(req, res, next));

export default router;