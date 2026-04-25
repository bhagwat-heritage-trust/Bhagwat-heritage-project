import { Router } from "express";
import {
  createMandirSevaBooking,
  getMandirSevaBookingsAdmin,
  updateMandirSevaBookingStatus,
} from "../controllers/mandirSevaBookingController";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.post("/bookings", createMandirSevaBooking);

router.get("/bookings", protect, requireRole("admin"), getMandirSevaBookingsAdmin);
router.patch("/bookings/:id/status", protect, requireRole("admin"), updateMandirSevaBookingStatus);

export default router;

