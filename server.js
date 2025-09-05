import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/db.connection.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/Auth.routes.js";
import jobRoutes from "./Routes/Job.routes.js";
import applicationRoutes from "./Routes/Application.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://hh-frontend-deployment.vercel.app",
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/auth", authRoutes);
app.use("/job", jobRoutes);
app.use("/application", applicationRoutes);

// Start Server + DB connect
app.listen(PORT, () => {
  console.log("Server is running on port =", PORT);
  connectDB();
});
