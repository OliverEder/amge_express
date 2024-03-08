import {} from "dotenv/config";
import express from "express";

const router_dashboard = express.Router();


router_dashboard.get("/", (req, res, next) => {
    res.render("dashboard/dashboard", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/usuarios", (req, res, next) => {
    res.render("dashboard/usuarios", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/delegaciones", (req, res, next) => {
    res.render("dashboard/delegaciones", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/banners", (req, res, next) => {
    res.render("dashboard/banners", {
        base_url: process.env.BASE_URL
    })
});

router_dashboard.get("/eventos", (req, res, next) => {
    res.render("dashboard/dashboard", {
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