import express from "express";

import { 
    register,
    login, 
    logout,
    edit_register
} from "../../controllers/user_controller.js"
import { login_validation } from "../../validations/login_validations.js";

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
router_api_user.post("/login", login_validation, login);


// logout
router_api_user.post("/logout", logout);
export default router_api_user;

//Edita registro usuario 
router_api_user.post("/editar_registro", edit_register);