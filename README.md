# TabIt-library

# **TabIt Library Management System**

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

5. **Start the Server:**
   ```bash
   npm run dev
   ```

## **API Routes**

### **Auth**

- **POST** `/auth/login`:  
  Login to get a JWT token.

---

### **Books**

- **GET** `/books`:  
  List all books.

- **POST** `/books`:  
  Add a new book (Employee only).

- **PUT** `/books/:id`:  
  Update book details (Employee only).

- **DELETE** `/books/:id`:  
  Delete a book (only if not loaned).

---

### **Loans**

- **POST** `/loans`:  
  Loan books (Customer only).

- **POST** `/loans/return`:  
  Return a loaned book.
