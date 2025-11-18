import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS CONFIG (Required for Netlify + Local)
app.use(
  cors({
    origin: [
      "http://localhost:5173",                  // local frontend (Vite)
      "http://localhost:3000",                  // if using CRA
      "dhanushavportfolioweb.netlify.app"   // <-- Replace with your real Netlify URL
    ],
  })
);

app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔️"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ✅ Routes
app.use("/api/contact", contactRoutes);

// ✅ Start Server (Render will auto use PORT)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
