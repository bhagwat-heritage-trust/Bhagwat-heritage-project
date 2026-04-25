import { Router } from "express";
import {
  createQuote,
  deleteQuote,
  getPublicQuotes,
  getQuotesByTheme,
  getTodayQuote,
  updateQuote,
} from "../controllers/quoteController";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/quotes/public", getPublicQuotes);
router.get("/quotes/today", getTodayQuote);
router.get("/quotes/theme/:theme", getQuotesByTheme);

router.post("/admin/quotes", protect, requireRole("admin"), createQuote);
router.put("/admin/quotes/:id", protect, requireRole("admin"), updateQuote);
router.delete("/admin/quotes/:id", protect, requireRole("admin"), deleteQuote);

export default router;
