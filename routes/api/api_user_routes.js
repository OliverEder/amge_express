import express from "express";

import { 
    register,
    login, 
    logout,
    edit_register,
    api_editar_usuario,
    api_buscar
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
router_api_user.put("/:user_id", api_editar_usuario);

// Eliminar registro
router_api_user.delete("/:user_id", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

// busqueda
router_api_user.post("/buscar", login_validation, api_buscar);

// login
router_api_user.post("/login", login_validation, login);

// logout
router_api_user.post("/logout", logout);

//Edita registro usuario 
router_api_user.post("/editar_registro", edit_register);

export default router_api_user;