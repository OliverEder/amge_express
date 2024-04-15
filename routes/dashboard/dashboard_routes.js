import {} from "dotenv/config";
import express from "express";
import { 
    session_validation, 
    session_validation_admin 
} from "../../validations/session_validation.js"
import { users_dashboard } from "../../controllers/user_controller.js";
const router_dashboard = express.Router();


router_dashboard.get(
    "/",
    session_validation, 
    session_validation_admin, 
    (req, res, next) => {
    res.render("dashboard/dashboard", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get(
    "/usuarios",
    session_validation, 
    session_validation_admin,
    users_dashboard
);

router_dashboard.get("/delegaciones", session_validation, (req, res, next) => {
    res.render("dashboard/delegaciones", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/banners", (req, res, next) => {
    res.render("dashboard/banners", session_validation, {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/eventos", (req, res, next) => {
    res.render("dashboard/dashboard",session_validation,  {
        base_url: process.env.BASE_URL
    })
});


router_dashboard.get("/noticias", (req, res, next) => {
    res.render("dashboard/dashboard", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/publicaciones", (req, res, next) => {
    res.render("dashboard/dashboard", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/votaciones", (req, res, next) => {
    res.render("dashboard/dashboard", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/boletines", (req, res, next) => {
    res.render("dashboard/boletines", {
        base_url: process.env.BASE_URL
    })
});

export default router_dashboard;