import express from "express";
import { register_new } from "../../controllers/news_controller.js";
import {api_votacion_registro} from "../../controllers/votaciones_controller.js"

const router_api_vote = express.Router();

// Nuevo registro
router_api_vote.post("/", api_votacion_registro);

export default router_api_vote;