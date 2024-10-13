import express from "express";
import { realizar_pago } from "../../controllers/user_controller.js";
const router_api_membership = express.Router();

// Nuevo registro
router_api_membership.post("/realizar_pago", realizar_pago);

export default router_api_membership;