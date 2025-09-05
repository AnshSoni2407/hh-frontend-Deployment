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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://hh-frontend-deployment.vercel.app",
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies/auth headers
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

// Test cookie route (for debugging)
app.get("/test-cookie", (req, res) => {
  res.cookie("testToken", "123456", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60000,
  }).send('cookie testing');
});

// Start Server + DB connect
app.listen(PORT, () => {
  console.log("Server is running on port =", PORT);
  connectDB();
});
