
import { BookController, IBookController } from "./src/api/controllers/book/book-controller-index";
import { BookRepository, IBookRepository } from "./src/repositories/book/book-repository-index";
import { BookService, IBookService } from "./src/services/book/book-service-index";
import { container } from "tsyringe";

// Register services
container.registerSingleton<IBookRepository>("IBookRepository", BookRepository);
container.registerSingleton<IBookService>("IBookService", BookService);
container.registerSingleton<IBookController>("IBookController", BookController);

export { container };
