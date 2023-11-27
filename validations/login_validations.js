import {check}  from "express-validator";

export const login_validation = [
    check("user_email", "El correo del usuario es obligatorio").not().isEmpty(),
    check("user_email", "Escribe un Email valido").isEmail(),
    check("user_password", "La contraseña debe ser mínimo de 6 caracteres").isLength({min:6})
];