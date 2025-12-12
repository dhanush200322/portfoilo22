import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// Allow only your deployed frontend
app.use(
  cors({
    origin: "https://portfoilo22-chi.vercel.app",
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected ✔️"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Routes
app.use("/api/contact", contactRoutes);

// Health Check (IMPORTANT for Railway)
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend Running ✔️" });
});

// Railway gives a PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
