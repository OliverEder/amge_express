import bcrypt from "bcrypt";
import moment from "moment";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { paginacion_tabla } from "../helpers/paginacion_tablas.js";
import {User} from "../models/user.js";
import { User_group } from "../models/user_group.js";
import { Delegation } from "../models/delegation.js";


export const users_dashboard = async (req, res, next) => {
    try {
        const { 
            params,
            session 
        } = req;
        const total_users = await User.count();
        console.log("params:",params);
        const datos_pagina = {
            pagina: parseInt(params.pagina),
            total_registros: total_users,
            registros_por_pagina: 10
        };
        const datos_paginacion = paginacion_tabla(datos_pagina);

        const users = await User.findAll({
            where: {user_status : "A"},
            include:[
                {model: User_group},
                {model: Delegation}
            ],
            offset: datos_paginacion.inicio,
            limit: datos_paginacion.registros_por_pagina
        });

        res.render("dashboard/usuarios", {
            base_url: process.env.BASE_URL,
            users: users,
            datos_paginacion: datos_paginacion,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : ""
        })
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
}

export const edit_user_dashboard = async (req, res, next) => {
    try {
        const {params} = req;
        const { session } = req;
        const user = await User.findOne({
            where: {user_id: params.user_id},
            include: [
                {model:User_group},
                {model: Delegation}
            ]
        });

        const user_groups = await User_group.findAll();
        const delegations = await Delegation.findAll();

        res.render("dashboard/editar_usuario", {
            base_url: process.env.BASE_URL,
            user: user,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            user_groups: user_groups,
            delegations:delegations
        })
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
}

export const register = async (req, res, next) => {
    try {
        const { body } = req;
        const user = await User.findOne({
            where:{ user_email: body.user_email }
        });
        
        if(user){
            res.status(400).json(
                { error:"Ya existe un usuario con ese correo electronico" }
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
            user_phone: body.user_phone,
            user_birth: body.user_birth,            
            user_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_email_updates: body.user_email_updates ? 1 : 0,
            user_nationality: body.user_nationality,
            user_address: body.user_address,
            user_blood_type: body.user_blood_type,
            user_group_id: 2,
            user_status: "A"
        });

        /* let contentHTML = `
            <h1>Registro de usuario</h1>
            <p>Bienvenido, te has registrado en AMGE con el correo ${body.user_email}</p>
            
        `;

        let transporter = nodemailer.createTransport({
            host: 'sycec.com.mx',
            port: 587,
            secure: false,
            auth: {
                user: 'soporte@sycec.com.mx',
                pass: 'H3rv3ry123##'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: '<soporte@sycec.com.mx>', // sender address,
            to: body.user_email,
            subject: 'Registro de usuario',
            html: contentHTML
        }); */
        console.log(info);
        res.json({ response: "Usuario guardado correctamente" });

    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
}

export const login = async (req, res, next) => {
    try {
        
        // Validación
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.status(400).json({errors:errores.array()});
            return;
        }
        const { body } = req;
        //validar si el usuario existe  
        const user = await User.findOne({where: {user_email: body.user_email}});
        if(!user) return res.status(400).json({errors:[{msg: "El usuario no existe"}]});
        //Validar si la contraseña es correcta
        //comparar los paswords hasheados
        const match = await bcrypt.compare(body.user_password, user.user_password);
        if(!match) return res.status(400).json({errors:[{msg:"El usuario o la contraseña son incorrectos"}]});
        //crear un payload
        const payload = { id: user.user_id }; 
        //Firmar el token      
        const { sign, verify } = jwt;
        const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: (1000 * 60 * 60 * 24) });
        const user_group = await User_group.findOne({ where: {user_group_id: user.user_group_id }});
        // Creación de la sesion por parte de express
        req.session.logged = true;
        req.session.user_email = user.user_email;
        req.session.user_id = user.user_id;
        req.session.user_group_id = user.user_group_id;
        console.log({
            token: token,
            user_id:user.user_id,
            user_email:user.user_email,
            user_group_id: user.user_group_id,
            user_group_name: user_group.user_group_name,
            errors: []
        });
        res.header("auth-token", token).json({
            token: token,
            user_id:user.user_id,
            user_email:user.user_email,
            user_group_id: user.user_group_id,
            user_group_name: user_group.user_group_name,
            errors: []
        });
        
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
} 

export const logout = async (req, res, next) => {
    try {
        const { session } = req;
        session.destroy();
        res.json({state: "Sesion finalizada"});
        
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
} 

export const api_editar_usuario = async (req, res, next) => {
    try {
        const {body, params} = req;

        const user_obj = {
            user_email: body.user_email,
            user_avatar: body.user_avatar,
            user_names: body.user_names,
            user_last_names: body.user_last_names,
            user_birth: body.user_birth,
            user_phone: body.user_phone,
            user_nationality: body.user_nationality,
            user_address: body.user_address,
            user_cp: body.user_cp,
            user_blood_type: body.user_blood_type,
            user_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_email_updates: body.user_email_updates,
            user_group_id: body.user_group_id,
            delegation_id: body.delegation_id,
            user_status: body.user_status
        }

        if(body.user_password != ""){
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash_password = await bcrypt.hash(body.user_password, salt);
            user_obj.user_password = hash_password;
        }

        const user = User.update(
            user_obj,
            {where: {user_id: params.user_id}}
        )
        res.json({mensaje: "Registro editado con éxito"});
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
}