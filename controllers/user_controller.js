import bcrypt from "bcrypt";
import moment from "moment";

import {User} from "../models/user.js"

export const register = async (req, res, next) => {
    try {
        const { body } = req;

        const user = await User.findOne({
            where:{ user_email: body.user_email }
        });
        console.log(user);
        if(user){
            res.status(400).json(
                { error:"El usuario o la contraseña son incorrectos" }
            );
            return ;
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash_password = await bcrypt.hash(body.user_password, salt);
        await User.create({
            user_email: body.user_email,
            user_password: hash_password,
            user_names: body.user_names,
            user_last_names: body.user_last_names,
            user_birth: body.user_birth,
            user_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_group_id: 2,
            user_status: "A"
        });

        res.json({ response: "Usuario guardado correctamente" });

    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
}