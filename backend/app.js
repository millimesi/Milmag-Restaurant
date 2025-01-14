import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models/indexModel.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


export const app = express();
const port = process.env.PORT || 8000;

const stripe = process.env.REACT_STRIPE_SECRET_KEY;


// CORS middleware
app.use(
  cors({
    origin: [
      `http://localhost:${process.env.FRONTENDPORT}`,
      `http://localhost:${process.env.PORT}`
    ], // Allow requests from these origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    // allowedHeaders: ["Content-Type", "Authorization", "cookies"],
  })
);

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Milmag Restaurant Application");
});

// Static middleware
// app.use("/images", express.static("images"));

// Routes Middlewares
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/reservation", reservationRoutes);
app.use("/api/v1/payments", paymentRoutes);

export const startServer = async () => {
  try {
    // Synchronize the models with the database
    await db.syncDb();

    // Run the admin seeder if not already seeded
    // await runAdminSeeder();

    // Start the server
    app.listen(port, () =>
      console.log(`Express Server is running on PORT ${port}`)
    );
  } catch (err) {
    console.error("Failed to start server: ", err);
  }
};

// startServer();

// Only start the server if this file is run directly (useful for testing)
if (process.env.NODE_ENV !== "test") {
  startServer();
}

// export default { app, startServer };
