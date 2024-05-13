import express from "express";
import { register_new } from "../../controllers/news_controller.js";
const router_api_new = express.Router();

// Nuevo registro
router_api_new.post("/", register_new);

export default router_api_new;