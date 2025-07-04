import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import greet from "./routes/greet.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/api/greet/", greet);
export default app;
