import {} from "dotenv/config";
import moment from 'moment';
import 'moment/locale/es.js';
moment.locale('es');

import { Prev_association_directive } from "../models/prev_association_directive.js"
import { Prev_association_directive_member } from "../models/prev_association_directive_member.js";
import { User } from "../models/user.js";
import { Delegation } from "../models/delegation.js";
import { User_group } from "../models/user_group.js";
import { Membership } from "../models/membership.js";
import {New} from "../models/new.js"

export const inicio = async (req, res, next) => {
    try {
        const { session } = req;

        const news = await New.findAll({
            where: {new_status: "A"},
            order: [['new_created_at', 'DESC']],
        })
        // Procesar las noticias para agregar fragmentos y limpiar contenido HTML
        const processed_news = news.map(newsItem => {
            const plainTextContent = newsItem.new_content.replace(/<[^>]*>/g, ''); // Quitar etiquetas HTML
            const previewContent = plainTextContent.length > 100
                ? plainTextContent.slice(0, 100) + '...' // Fragmento de 100 caracteres
                : plainTextContent;
            // Formatear la fecha como "enero 2025"
            const formattedDate = moment(newsItem.new_created_at).format('MMMM YYYY');

            return {
                id: newsItem.new_id,
                title: newsItem.new_title,
                thumbnail: newsItem.new_thumbnail,
                contentPreview: previewContent,
                createdAt: newsItem.new_created_at,
                formattedDate: formattedDate
            };
        });
        
        res.render("index", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            membership: session.membership,
            processed_news: processed_news
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        next(); 
    }    
}

export const nosotros = async (req, res, next) => {
    try {
        const { session } = req;
        const directives = await Prev_association_directive.findAll();
        const prev_association_directive_member = await Prev_association_directive_member.findAll();
        console.log("directives:",directives);
        res.render("nosotros", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            directives: directives,
            members:prev_association_directive_member,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : ""
        });
    } catch (error) {
        console.log(error);
    }
}

export const registro = async (req, res, next ) => {
    try {
        const { session } = req;
        res.render("registro", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : ""
        });
    } catch (error) {
        console.log(error);
    }
}

export const perfil = async (req, res, next) => {
    try {
        const { session } = req;
        

        const user = await User.findOne({
            where:{user_id: session.user_id},
            include: [
                {model:Delegation},
                {model:User_group}
            ]
        });
        const membership = await Membership.findOne({where:{user_id: session.user_id}});
        
        console.log("membership:", membership);
        res.render("perfil", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            user: user,
            membership: membership
        });
    } catch (error) {
        console.log(error);
    }
}

export const editar_perfil = async (req, res, next) => {
    try {
        const { session } = req;
        

        const user = await User.findOne({where:{user_id: session.user_id}});
        const membership = await Membership.findOne({where:{user_id: session.user_id}});
        res.render("editar_perfil", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            user: user
        });
    } catch (error) {
        console.log(error);
    }
}

export const boletines = async (req, res, next) => {
    try {
        const { session } = req;
        
        res.render("boletines", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : ""
        });
    } catch (error) {
        console.log(error);
    }
}