import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import { imageUpload } from "../middleware/upload";

const router = Router();

// POST /api/upload
router.post("/upload", imageUpload.single("image"), uploadImage);

export default router;

