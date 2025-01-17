import axios from "axios";
import bcrypt from "bcrypt";
import fetch from 'node-fetch';
import moment from "moment";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import fs from "fs-extra";
import {User} from "../models/user.js";
import { User_group } from "../models/user_group.js";
import { where, Op, Sequelize } from "sequelize";
import {} from "dotenv/config";
import { paginacion_tabla } from "../helpers/paginacion_tablas.js";
import { Sesion } from "../models/sesion.js";
import { Delegation } from "../models/delegation.js";
import { Membership } from "../models/membership.js";
import { Cat_membership_type } from "../models/cat_membership_type.js";


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
            include:[
                {model: User_group},
                {model: Delegation}
            ],
            order: [["user_last_names", "ASC"]],
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
        const memberships = await Membership.findAll({
            where:{user_id: params.user_id},
            include: [
                {model:Cat_membership_type},
            ]
        });

        console.log("memberships:", memberships);
        
        res.render("dashboard/editar_usuario", {
            base_url: process.env.BASE_URL,
            user: user,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            user_groups: user_groups,
            delegations:delegations,
            memberships: memberships
        });
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
        //Crear nuevo registro de sesion
        const new_sesion = await Sesion.create({
            user_id: user.user_id,
            sesion_in: moment().subtract(6 ,'H').format('YYYY-MM-DD HH:mm:ss'),
            sesion_last_check: moment().subtract(6 ,'H').format('YYYY-MM-DD HH:mm:ss'),
            sesion_status: "A"
        });

        //crear un payload
        const payload = { id: user.user_id }; 
        //Firmar el token      
        const { sign, verify } = jwt;
        const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: (1000 * 60 * 60 * 24) });
        const user_group = await User_group.findOne({ where: {user_group_id: user.user_group_id }});
        const membresia = await Membership.findOne({
            where: {
                user_id: user.user_id,
                membership_status: "A"
            }
        });

        // Creación de la sesion por parte de express
        req.session.logged = true;
        req.session.user_email = user.user_email;
        req.session.user_id = user.user_id;
        req.session.sesion_id = new_sesion.sesion_id;
        req.session.user_group_id = user.user_group_id;
        req.session.user_names = user.user_names;
        req.session.user_last_names = user.user_last_names;
        if(membresia){
            req.session.membership = membresia.membership_status;
        }else{
            req.session.membership = "I";
        }
        
        res.header("auth-token", token).json({
            token: token,
            user_id:user.user_id,
            user_email:user.user_email,
            user_group_id: user.user_group_id,
            user_group_name: user_group.user_group_name,
            membresia: membresia,
            user_names: user.user_names,
            user_last_names: user.user_last_names,
            sesion_id: new_sesion.sesion_id,
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
        const { session, body } = req;
        
        const user = await User.findOne({ where: { user_id: body.user_id } });
        const sesion = await Sesion.findOne({where: { sesion_id: body.sesion_id } });
        
        if(sesion.sesion_status === "A") {
            const sesion_inactiva = User.update({
                user_active_session: user.user_sesiones_activas - 1
            }, {
                where: { user_name: body.user_name }
            });
            const sesion_salida = Sesion.update({
                sesion_out: moment().subtract(6 ,'H').format('YYYY-MM-DD HH:mm:ss'),
                sesion_last_check: moment().subtract(6 ,'H').format('YYYY-MM-DD HH:mm:ss'),
                sesion_status: "I"
        
            }, {
                where: { sesion_id: body.sesion_id }
            });
        }
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
        console.log("user_obj:", user_obj);
        if(body.user_password != ""){
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash_password = await bcrypt.hash(body.user_password, salt);
            user_obj.user_password = hash_password;
        }

        const user = await User.update(
            user_obj,
            {where: {user_id: params.user_id}}
        )
        console.log("user:", user);
        res.json({mensaje: "Registro editado con éxito"});
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next();
    }
}

export const api_buscar = async (req,res, next ) => {
    try {
        const {body} = req;
        const busqueda = await User.findAll({
            where: {
              [Op.or]: [
                Sequelize.where(Sequelize.col('user_email'), {
                  [Op.like]: `%${body.busqueda}%`
                }),
                Sequelize.where(Sequelize.col('user_names'), {
                  [Op.like]: `%${body.busqueda}%`
                }),
                Sequelize.where(Sequelize.col('user_last_names'), {
                  [Op.like]: `%${body.busqueda}%`
                }),
              ]
            },
            include:[
                {model: User_group},
                {model: Delegation}
            ],
            order: [["user_last_names", "ASC"]],
        });
        res.json(busqueda);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
} 

export const edit_register = async (req, res, next) => {
    try {
        const { body } = req;
        // Procesar y guardar imagen si está presente
        if (body.user_avatar != "") {
            // Generar la carpeta para el usuario
            console.log("user_avatar");
            const userFolder = fs.existsSync(`public/usuarios/${body.user_id}`);
            if(!userFolder){
                fs.mkdirSync(`public/usuarios/${body.user_id}`);
            }
            // Reemplazar imagen a png y base64
            const base_64_data = body.user_avatar.replace(/^data:image\/png;base64,/, "");
            // Guardar imágen en la siguiente ruta y con el nombre de la nueva categoría
            fs.writeFileSync(`public/usuarios/${body.user_id}/${body.user_id}.png`, base_64_data, 'base64');
        }

        // Generar hash de contraseña si se proporciona una nueva
        let hash_password = body.user_password_anterior;
        if (body.user_password_edit) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            hash_password = await bcrypt.hash(body.user_password_edit, salt);
        }
        const user = await User.findOne({
            where:{user_id: body.user_id }
        });
        // Actualizar usuario en la base de datos
        const editado = await User.update({
            user_email: body.user_email,
            user_password: hash_password,
            user_names: body.user_names,
            user_last_names: body.user_last_names,
            user_phone: body.user_phone,
            user_birth: body.user_birth,
            user_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_nationality: body.user_nationality,
            user_address: body.user_address,
            user_blood_type: body.user_blood_type,
            user_avatar: body.user_avatar ? `${body.user_id}.png` : user.user_avatar, // Actualizar el nombre del avatar si se cargó
        }, {
            where: { user_id: body.user_id }
        });
        
        // Responder con éxito
        res.json({ response: "Usuario editado correctamente" });
        /* let img_value = ""
        if(body.user_avatar !== ''){
            img_value = body.user_id
        }

        if (body.user_password_edit != "") {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash_password = await bcrypt.hash(body.user_password_edit, salt);
            const editado = await User.update({
                user_email: body.user_email,
                user_password: hash_password,
                user_names: body.user_names,
                user_last_names: body.user_last_names,
                user_phone: body.user_phone,
                user_birth: body.user_birth,            
                user_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                user_nationality: body.user_nationality,
                user_address: body.user_address,
                user_blood_type: body.user_blood_type,
                user_avatar: img_value,
            },{where:{user_id: body.user_id}});
        } else {
            const editado = await User.update({
                user_email: body.user_email,
                user_password: body.user_password_anterior,
                user_names: body.user_names,
                user_last_names: body.user_last_names,
                user_phone: body.user_phone,
                user_birth: body.user_birth,            
                user_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                user_nationality: body.user_nationality,
                user_address: body.user_address,
                user_blood_type: body.user_blood_type,
                user_avatar: img_value,
            },{where:{user_id: body.user_id}});
        }
        
        const userFolder = fs.existsSync(`public/usuarios/${body.user_id}`);
        if(!userFolder){
            fs.mkdirSync(`public/usuarios/${body.user_id}`);
          }
        if(body.user_avatar != ""){
            // Reemplazar imagen a png y base64
            let base_64_data = body.user_avatar.replace(/^data:image\/png;base64,/, "");
            // Guardar imágen en la siguiente ruta y con el nombre de la nueva categoría
            fs.writeFile(`public/usuarios/${body.user_id}/${body.user_id}.png`, base_64_data, 'base64', (err) => {
                console.log("err---------------------------->", err);
            });
        }

        res.json({ response: "Usuario editado correctamente" }); */
    } catch (error) {
        //Enviar error
        console.log(error);
        
        res.status(400).send(error);
        next();
    }
}

export const realizar_pago = async (req, res, next) => {
    try {
        const {body} = req;
        console.log("realizar_pago===================================");
        
        // Reemplaza con tu API key de Clip y los datos del cliente
        const apiKey = '8bef80-f3d1-443f-a054-8e445a8614'; // Coloca tu API key aquí
        const paymentToken = body.cardTokenID; // Token generado previamente
        const customerEmail = 'oliver.espinosa.meneses@gmail.com'; // Coloca el correo del cliente
        const customerPhone = '7771862220'; // Coloca el teléfono del cliente

         // Cuerpo de la solicitud
        const paymentData = {
            amount: 100.00, // Monto en MXN
            currency: 'MXN',
            description: 'Prueba Checkout Transparente',
            payment_method: {
            token: paymentToken, // Token del pago obtenido anteriormente
            },
            customer: {
            email: customerEmail,
            phone: customerPhone,
            },
        };

        /* // Configura la solicitud a Clip
        const response = await axios.post(
            'https://api.payclip.com/payments',
            {
                amount: 0.01, // Monto en MXN
                currency: 'MXN',
                description: 'Prueba Checkout Transparente',
                payment_method: {
                token: body.cardTokenID, // Token del pago obtenido anteriormente
                },
                customer: {
                email: customerEmail,
                phone: customerPhone,
                },
            },
            {
                headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                },
            }
        );
 */
         // Realiza la solicitud POST a la API de Clip usando fetch
        const response = await fetch('https://api.payclip.com/payments', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData), // Convierte el cuerpo de la solicitud a JSON
        });
        console.log("response:", response);
        /* console.log("response:", response);
        
        // Envía la respuesta de Clip al frontend
        res.status(200).json(response.data); */

        // Verifica el estado de la respuesta
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

      // Convierte la respuesta a JSON
      const responseData = await response.json();
  
      // Envía la respuesta de Clip al frontend
      res.status(200).json(responseData);
        
    } catch (error) {
        //Enviar error
        console.log("error", error);
        
        res.status(400).send(error);
        next();
    }
}

export const api_nueva_membresia = async (req, res, next) => {
    try {
        const {body} = req;
        const new_membership = await Membership.create({
            membership_created_at: body.fecha_inicio,
            membership_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            cat_membership_type_id: body.tipo_membresia_id,  
            user_id : body.user_id, 
            membership_status: "A"
        });
        const cat_membership_type = await Cat_membership_type.findOne({
            where:{cat_membership_type_id: body.tipo_membresia_id}
        });

        const user = await User.findOne({
            where:{user_id: body.user_id}
        });

        // Crear correo de bienvenida
        let contentHTML = `
            Estimado(a) ${user.user_last_names} ${user.user_names}

            <div class="content">
                <p>Nos complace darte la más cálida bienvenida a la <strong>Asociación Mexicana de Geofísicos de Exploración (AMGE)</strong>.</p>
                <p>Nos alegra contar con tu participación en esta comunidad de profesionales comprometidos con el avance de la geofísica y la exploración en México. En la AMGE, trabajamos para fomentar el desarrollo y la innovación en el campo de la geofísica, promoviendo la colaboración y el intercambio de conocimiento con colegas y organizaciones a nivel internacional.</p>
                <p>Tu experiencia y contribuciones son valiosas para nosotros, y estamos seguros de que juntos lograremos avanzar en el entendimiento de nuevas técnicas y tecnologías en la exploración geofísica global.Esperamos que esta membresía te brinde acceso a una red profesional de gran alcance, así como a oportunidades para participar en conferencias, publicaciones y proyectos internacionales que resalten el papel de la geofísica mexicana en el escenario global.</p>
                <p><strong>¡Bienvenido(a) a la AMGE, y gracias por formar parte de nuestra misión de trascender fronteras!</strong></p>
            </div>
            <div class="footer">
                Atentamente,<br>
                Asociación Mexicana de Geofísicos de Exploración (AMGE)
            </div>
        `;
        let transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: 'administracion@amgemx.org',
                pass: '2024.Amge.2024'
            },
            tls: { rejectUnauthorized: false }
        });
        try {
            let info = await transporter.sendMail({
                from: 'AMGE <administracion@amgemx.org>', // sender address,
                to: 'oliver.espinosa.meneses@gmail.com',
                subject: 'Membresia Activa',
                html: contentHTML
            });
            console.log('Correo enviado: ', info.response);
        } catch (error) {
            console.error('Error al enviar el correo: ', error);
        }
        

        const response = {
            new_membership:new_membership,
            cat_membership_type:cat_membership_type 
        };
        res.json(response);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}