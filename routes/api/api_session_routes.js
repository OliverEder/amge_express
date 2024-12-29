import express from "express";
import {
    get_paginated_sessions,
    get_session_stats_last30_days
} from "../../controllers/sesion_controller.js"

const router_api_session = express.Router();

// Nuevo registro
router_api_session.get("/", get_paginated_sessions);
router_api_session.get("/stats", get_session_stats_last30_days);

export default router_api_session;