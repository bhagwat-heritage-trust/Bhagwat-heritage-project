import { Router } from "express";
import multer from "multer";
import {
  adminGenerateMembershipCard,
  adminGetMemberships,
  adminUpdateMembershipStatus,
  createMembershipPaymentOrder,
  getMembershipCard,
  getMembershipProfile,
  registerMembership,
  verifyMembershipById,
  verifyMembershipPayment,
} from "../controllers/membershipController";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/membership/register", upload.fields([{ name: "profilePhoto", maxCount: 1 }, { name: "idProof", maxCount: 1 }]), registerMembership);
router.post("/membership/payment/create-order", createMembershipPaymentOrder);
router.post("/membership/payment/verify", verifyMembershipPayment);
router.get("/membership/profile", getMembershipProfile);
router.get("/membership/card/:memberId", getMembershipCard);
router.get("/membership/verify/:memberId", verifyMembershipById);

router.get("/admin/memberships", protect, requireRole("admin"), adminGetMemberships);
router.patch("/admin/memberships/:id/status", protect, requireRole("admin"), adminUpdateMembershipStatus);
router.post("/admin/memberships/:id/generate-card", protect, requireRole("admin"), adminGenerateMembershipCard);

export default router;
