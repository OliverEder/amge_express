import express from "express";

import { 
    delegaciones, 
    delegacion 
} from "../../controllers/delegaciones_controller.js";
import { 
    nosotros, 
    registro,
    perfil,
    editar_perfil,
    boletines
} from "../../controllers/amge_controller.js";

import { session_validation } from "../../validations/session_validation.js"

const router_amge = express.Router();


router_amge.get("/", (req, res, next) => {
    try {
        const { session } = req;
        console.log("=======================");
        console.log("session:", session);
        console.log("=======================")
        res.render("index", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : ""
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        next(); 
    }    
});

router_amge.get("/nosotros", nosotros);

router_amge.get("/registro", registro);

router_amge.get("/registro_membresia", (req, res, next) => {
    const { session } = req;
    res.render("registro_membresia", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/membresias", (req, res, next) => {
    const { session } = req;
    res.render("membresias", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/aviso_privacidad", (req, res, next) => {
    const { session } = req;
    res.render("aviso_privacidad", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/servicios", (req, res, next) => {
    const { session } = req;
    res.render("servicios", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/perfil/:user_id",session_validation,  perfil);

router_amge.get("/editar_perfil/:user_id",session_validation,  editar_perfil);

router_amge.get("/noticia/:noticia_id", (req, res, next) => {
    const { session, params } = req;
    const noticias = {
        tampico_cuna_de_un_legado: "tampico"
    }
    res.render(`noticias/${noticias[params.noticia_id]}`, {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : ""
    });
});

router_amge.get("/boletines", boletines);
export default router_amge;