import { Request, Response, NextFunction } from "express";
import { IBookController } from "./book-controller.interface";
import { IBookService } from "../../../services/book/book-service-index";
import { validate } from "class-validator";
import { BookDto } from "../../../dtos/book.dto";
import logger from "../../../utils/winston-logger";
import { inject, injectable } from "tsyringe";

@injectable()
export class BookController implements IBookController {

  constructor(@inject('IBookService') private bookService: IBookService) {
  }
  async searchBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info("User requested to search book")
    try {
      const query = req.query;
      if (query) {
        const books = this.bookService.searchBook(query);
        res.status(200).json(books);
      }
    } catch (error) {
      next(error)
    }
  }

  async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info("user requested books/id");
      const { id } = req.params;
      const book = await this.bookService.getBookByTitle(id);
      if (!book) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      next(error);
    }
  }

  async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookData = Object.assign(new BookDto(), req.body);
      const errors = await validate(bookData);

      if (errors.length > 0) {
        res.status(400).json({ errors });
      }

      const newBook = await this.bookService.createBook(bookData);
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updatedBook = await this.bookService.updateBookByTitle(id, req.body);
      if (!updatedBook) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.bookService.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
