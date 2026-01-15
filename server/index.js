import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import homeRoutes from "./routes/home.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import contactRoutes from "./routes/contact.routes.js";


dotenv.config();
connectDB();

const app = express();

/* ---------- Middlewares ---------- */

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.VERCEL_PREVIEW_URL,
  process.env.DEV_CLIENT_URL,
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactRoutes);




/* ---------- Health Check ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Backend is running"
  });
});

/* ---------- Error for unknown routes ---------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
