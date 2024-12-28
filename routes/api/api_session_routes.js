import express from "express";
import {get_paginated_sessions} from "../../controllers/sesion_controller.js"

const router_api_session = express.Router();

// Nuevo registro
router_api_session.get("/", get_paginated_sessions);

export default router_api_session;