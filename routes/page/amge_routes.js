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

import {
    votacion_contestar
} from "../../controllers/votaciones_controller.js"

import { session_validation } from "../../validations/session_validation.js"

const router_amge = express.Router();


router_amge.get("/", (req, res, next) => {
    try {
        const { session } = req;

        res.render("index", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            membership: session.membership
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
    console.log("session", session);
    
    res.render("membresias", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : "",
        user_names:  session.logged ? session.user_names : "",
        user_last_names:  session.logged ? session.user_last_names : "",
        membership: session.membership
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
        tampico_cuna_de_un_legado: "tampico",
        reporte_actividades_tampico: "reporte_actividades_tampico",
        convocatoria_registro_planillas: "convocatoria_registro_planillas",
        comunicado_votacion: "comunicado_votacion",
        resultados_votacion: "resultados_votacion",
        segunda_asamblea: "segunda_asamblea"
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

router_amge.get("/votacion/:vote_id", session_validation, votacion_contestar);
export default router_amge;