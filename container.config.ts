
import { ILoan } from "src/dtos/loan.dto";
import { BookController, IBookController } from "./src/api/controllers/book/book-controller-index";
import { BookRepository, IBookRepository } from "./src/repositories/book/book-repository-index";
import { BookService, IBookService } from "./src/services/book/book-service-index";
import { container } from "tsyringe";
import { ILoanRepository, LoanRepository } from "./src/repositories/loan/loan-repository-index";
import { ILoanService, LoanService } from "./src/services/loan/loan-service-index";
import { ILoanController, LoanController } from "./src/api/controllers/loan/loan-controller-index";

// Register repositories
container.registerSingleton<IBookRepository>("IBookRepository", BookRepository);
container.registerSingleton<ILoanRepository>("ILoanRepository", LoanRepository);

// Register Services
container.registerSingleton<IBookService>("IBookService", BookService);
container.registerSingleton<ILoanService>("ILoanService", LoanService);

// Register controllers
container.registerSingleton<IBookController>("IBookController", BookController);
container.registerSingleton<ILoanController>("ILoanController", LoanController);




export { container };
