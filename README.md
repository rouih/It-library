# It-library

# **It Library Management System**

A backend application for managing a physical library, including books, users, and loans with role-based access control (RBAC) and authentication.

---

## **Features**

- **CRUD operations** for books and users.
- **Role-based access control**: Employees and Customers.
- **JWT-based authentication**.
- **Loan management** with return periods based on book ratings.
- **MongoDB transactions** for consistency.

---

## **Technologies Used**

- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT** and **Passport.js** for authentication
- **Jest** for testing

---

## **Setup**

1. **Clone the Project:**
   ```bash
   git clone https://github.com/your-repo/tabit-library.git
   cd tabit-library
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file:**
   ```bash
   cp .env.example .env
   ```
4. **Configure the .env file:**

   ```bash
   # MongoDB connection string
   MONGO_URI=mongodb://localhost:27017/your-database-name

   # JWT secret key
   JWT_SECRET=your-jwt-secret-key
   ```

5. **(OPTIONAL)** Seed a sample database:

   ```bash
   npm run seed-db
   ```

6. **Start the Server:**
   ```bash
   npm run dev
   ```

## **API Routes**

### **users**

- **POST** `/users/login`:  
  Login to get a JWT token.

- **POST** `/users`:  
  Create a new user
- **DTO** `CreateUserDto`:

  ```typescript
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: "username is requiered" })
    username!: string;

    @IsString()
    @IsNotEmpty({ message: "id is requiered" })
    userId!: string;

    @IsString()
    @MinLength(6, {
      message: "Password must be at least 6 characters long"
    })
    @IsNotEmpty({ message: "Password is required" })
    password!: string;

    @IsEnum(UserRole, {
      message: 'Role must be either "customer" or "employee"'
    })
    @IsNotEmpty({ message: "Role is required" })
    role!: UserRole;
  }
  ```

- **delete** `/users/:id`:  
  Delete a user
- **put** `/users/:id`:  
  Update a user
- **get** `/users`:
  Get all users, employees only

---

### **Books**

- **GET** `/books`:  
  List all books.

- **GET** `/books/search`:  
  Search by title, author, and year.
- **DTO** `SearchBookDto`:

  ```typescript
  export class SearchBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsInt()
    @Min(1000)
    year?: number;
  }
  ```

- **POST** `/books`:  
  Add a new book (Employee only).

  - **DTO** `CreateBookDto`:

    ```typescript
    export class CreateBookDto {
      @IsString()
      @IsNotEmpty()
      title!: string;

      @IsString()
      @IsNotEmpty()
      author!: string;

      @IsInt()
      @Min(1000)
      year!: number;

      @IsString()
      @IsNotEmpty()
      topic!: string;

      @IsInt()
      @Min(1)
      @Max(5)
      rating!: number; // rating between 1 to 5 to determine loan period

      @IsBoolean()
      available?: boolean;
    }
    ```

- **PUT** `/books/:id`:  
  Update book details (Employee only).

- **DELETE** `/books/:id`:  
  Delete a book (only if not loaned).

---

### **Loans**

- **POST** `/loans`:  
  Loan books (Customer only).

  - **DTO** `CreateLoanDto`:

    ```typescript
    export class CreateLoanDto {
      @IsString()
      @IsNotEmpty()
      userId: string;

      @IsArray()
      @IsNotEmpty()
      books: BookDto[];
    }
    ```

- **GET** `/loans/allLoans`:  
  Get all loans

- **POST** `/loans/return`:  
  Return a loaned book.

  - **DTO** `ReturnBookDto`:
    ```typescript
    export class ReturnBookDto {
      @IsString()
      @IsNotEmpty()
      loanId: string;
      bookId: string;
    }
    ```

- **get** `/loans/:id`:  
  Get loaned books by user
