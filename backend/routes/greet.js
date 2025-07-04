import express from "express";
import { greetHello } from "../controllers/welcome.js";
const router = express.Router();
router.get("/hello", greetHello);
export default router;
