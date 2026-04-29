import { Router } from "express";
import { createOnlineSatsangRequest } from "../controllers/onlineSatsangController";

const router = Router();

router.post("/online-satsang/request", createOnlineSatsangRequest);

export default router;
