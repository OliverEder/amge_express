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
    
    const { session } = req;

    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/nosotros", nosotros);

router_amge.get("/registro", registro);

router_amge.get("/membresias", (req, res, next) => {
    const { session } = req;
    res.render("membresias", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/servicios", (req, res, next) => {
    const { session } = req;
    res.render("servicios", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/perfil/:user_id", (req, res, next) => {
    const { session } = req;
    res.render("perfil", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_email:  session.logged ? session.user_email : ""
    });
});


export default router_amge;