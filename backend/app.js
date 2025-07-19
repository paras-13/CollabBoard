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
app.get("/", (req, res) => {
  res.send(
    "<h1>This is official backend server of collab-board application</h1><p>Copyright @CodingComrades</p><a href='https://collabboard-7ups.onrender.com/api/greet/hello'>Greet</a>"
  );
});
export default app;
