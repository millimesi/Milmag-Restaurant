import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './models/indexModel.js';
import userRoutes from './routes/userRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

export const app = express();
const port = process.env.PORT || 8000;

// CORS middleware
app.use(cors({
  origin: `http://localhost:${process.env.FRONTENDPORT}`, // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Milmag Restaurant Application');
});

// Routes Middlewares
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/menu', menuRoutes);

export const startServer = async () => {
  try {
    // Synchronize the models with the database
    await db.syncDb();

    // Run the admin seeder if not already seeded
    // await runAdminSeeder();

    // Start the server
    app.listen(port, () => console.log(`Express Server is running on PORT ${port}`));
  } catch (err) {
    console.error('Failed to start server: ', err);
  }
};

// startServer();

// Only start the server if this file is run directly (useful for testing)
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

// export default { app, startServer };
