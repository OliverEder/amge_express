import express from "express";
import { 
    delegaciones, 
    delegacion 
} from "../../controllers/delegaciones_controller.js";
const router_delegaciones = express.Router();


router_delegaciones.get("/", delegaciones);
router_delegaciones.get("/:delegacion_id", delegacion);

export default router_delegaciones;