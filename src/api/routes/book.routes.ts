import { Router } from "express";
import { BookController } from "../controllers/book/book-controller-index";
import {container} from '../../../container.config';

const router = Router();

const bookController = container.resolve(BookController);

router.get("/", (req, res, next) => bookController.getBooks(req, res, next));
router.get("/search", (req, res, next) => bookController.searchBook(req, res, next));
router.get("/:id", (req, res, next) =>
  bookController.getBookById(req, res, next)
);

router.post("/", (req, res, next) => bookController.createBook(req, res, next));
router.put("/:id", (req, res, next) =>
  bookController.updateBook(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  bookController.deleteBook(req, res, next)
);

export default router;
