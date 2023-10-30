import express from "express";

import { 
    delegaciones, 
    delegacion 
} from "../../controllers/delegaciones_controller.js";
import { 
    nosotros, 
    registro
} from "../../controllers/amge_controller.js";

const router_amge = express.Router();


router_amge.get("/", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

router_amge.get("/nosotros", nosotros);

router_amge.get("/registro", registro);

router_amge.get("/membresias", (req, res, next) => {
    res.render("membresias", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

router_amge.get("/servicios", (req, res, next) => {
    res.render("servicios", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

router_amge.get("/perfil/:user_id", (req, res, next) => {
    res.render("perfil", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});


export default router_amge;