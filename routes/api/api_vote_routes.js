import express from "express";

import {
    api_votacion_registro, 
    api_registrar_respustas
} from "../../controllers/votaciones_controller.js"

const router_api_vote = express.Router();

// Nuevo registro
router_api_vote.post("/", api_votacion_registro);
router_api_vote.post("/answer", api_registrar_respustas);

export default router_api_vote;