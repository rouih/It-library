import { Request, Response, NextFunction } from "express";

export interface IBookController {
  getBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
  getBookById(req: Request, res: Response, next: NextFunction): Promise<void>;
  createBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteBook(req: Request, res: Response, next: NextFunction): Promise<void>;
  searchBook(req: Request, res: Response, next: NextFunction): Promise<void>;
}
