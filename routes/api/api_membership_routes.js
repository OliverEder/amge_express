import express from "express";
import { realizar_pago, api_nueva_membresia } from "../../controllers/user_controller.js";
const router_api_membership = express.Router();

// Nuevo registro
router_api_membership.post("/realizar_pago", realizar_pago);
router_api_membership.post("/", api_nueva_membresia);

export default router_api_membership;