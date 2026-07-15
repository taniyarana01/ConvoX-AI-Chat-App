import express from "express";
import { askAI } from "../controllers/ai.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { summarizeChat } from "../controllers/ai.controller.js";
import { translateMessage} from "../controllers/ai.controller.js";

const router = express.Router();

// POST /api/ai/ask
router.post("/ask", protectRoute, askAI);
router.post("/summary", summarizeChat);
router.post("/translate", translateMessage);

export default router;