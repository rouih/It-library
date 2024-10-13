import { Router } from "express";
import { container } from '../../../container.config';
import { LoanController } from "../controllers/loan/loan-controller-index";
const router = Router();

const loanController = container.resolve(LoanController);

router.post("/loan", (req, res, next) => loanController.loanBook(req, res, next));
router.post("/return", (req, res, next) => loanController.returnBook(req, res, next));
router.get("/loaned", (req, res, next) => loanController.getLoanedBooks(req, res, next));
router.get("/loans", (req, res, next) => loanController.getAllLoans(req, res, next));

export default router;