
import { BookController, IBookController } from "../api/controllers/book/book-controller-index";
import { BookRepository, IBookRepository } from "../repositories/book/book-repository-index";
import { BookService, IBookService } from "../services/book/book-service-index";
import { container } from "tsyringe";
import { ILoanRepository, LoanRepository } from "../repositories/loan/loan-repository-index";
import { ILoanService, LoanService } from "../services/loan/loan-service-index";
import { ILoanController, LoanController } from "../api/controllers/loan/loan-controller-index";
import { IUserRepository, UserRepository } from "../repositories/user/user-repository-index";
import { IUserService, UserService } from "../services/user/user-service-index";
import { IUserController, UserController } from "../api/controllers/user/user-controller-index";

// Register repositories
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
container.registerSingleton<IBookRepository>("IBookRepository", BookRepository);
container.registerSingleton<ILoanRepository>("ILoanRepository", LoanRepository);

// Register Services
container.registerSingleton<IUserService>("IUserService", UserService);
container.registerSingleton<IBookService>("IBookService", BookService);
container.registerSingleton<ILoanService>("ILoanService", LoanService);

// Register controllers
container.registerSingleton<IUserController>("IUserController", UserController);
container.registerSingleton<IBookController>("IBookController", BookController);
container.registerSingleton<ILoanController>("ILoanController", LoanController);




export { container };
