import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BookModel from './models/book.model';

dotenv.config(); // Load the environment variables

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if the connection fails
  }
};

// Mock book data
const booksMock = [
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    year: 1999,
    topic: 'Software Development',
    rating: 5,
    available: true,
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    topic: 'Software Development',
    rating: 5,
    available: true,
  },
  {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    year: 2008,
    topic: 'Programming',
    rating: 4,
    available: true,
  },
  {
    title: 'The Clean Coder',
    author: 'Robert C. Martin',
    year: 2011,
    topic: 'Software Development',
    rating: 5,
    available: true,
  },
  {
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    year: 1999,
    topic: 'Software Development',
    rating: 5,
    available: false,
  },
];

// Seed the book data into the database
const seedBooks = async () => {
  try {
    await BookModel.deleteMany({}); // Clear existing books
    await BookModel.insertMany(booksMock); // Insert mock books
    console.log('Book data seeded successfully');
  } catch (error) {
    console.error('Error seeding book data:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
};

// Run the script
const run = async () => {
  await connectToDatabase();
  await seedBooks();
};

run();
