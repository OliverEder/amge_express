import express from "express";

import { register } from "../../controllers/user_controller.js"

const router_api_user = express.Router();

// Todos los registros
router_api_user.get("/", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

// Nuevo registro
router_api_user.post("/", register);

// Editar registro
router_api_user.put("/:user_id", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

// Eliminar registro
router_api_user.delete("/:user_id", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

// login
router_api_user.post("/login", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});


// logout
router_api_user.post("/logout", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});
export default router_api_user;