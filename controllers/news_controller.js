import { New } from "../models/new.js";
import moment from "moment";

export const news = async (req, res, next) => {
    try {
        const { session } = req;

        
       const news =  await New.findAll();
       
        res.render("dashboard/noticias", {
            base_url: process.env.BASE_URL,
            api_base_url: process.env.API_BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            news: news
        });
    } catch (error) {
       //Enviar error
       res.status(400).send(error);
       next(); 
    }
}

export const view_edit_new = async (req, res, next) => {
    const { params, session } = req;
    const new_obj = await New.findOne({
        where: { new_id:params.new_id }
    });


    res.render("dashboard/noticia_editar", {
        base_url: process.env.BASE_URL,
        logged: session.logged ? session.logged : false,
        user_id: session.logged ? session.user_id : "",
        user_email:  session.logged ? session.user_email : "",
        new_obj: new_obj
    })
}

export const api_register_new = async (req, res, next) => {
    try {
        const {body, file, session} = req;
        
        const noticia = await New.create({
            new_title: body.new_title,
            new_content: body.new_content,
            new_thumbnail: file.originalname,
            new_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            new_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            new_status: body.new_status
        });
        res.json({
            noticia:noticia
        });
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next(); 
    }
}

export const api_edit_new = async (req, res, next) => {
    try {
        const {body, file, params} = req;

        let new_obj = {
            new_title: body.new_title,
            new_content: body.new_content,
            new_modified_at: moment().format("YYYY-MM-DD HH:mm:ss") , 
            new_status: body.new_status
        }

        
        if(file){
            new_obj.new_thumbnail = file.filename;
        }

        const noticia = await New.update(
            new_obj,
            {
                where: { new_id: params.new_id } 
            }
        );

        res.json({
            noticia:noticia
        });
    } catch (error) {
        //Enviar error
        res.status(400).send(error);
        next(); 
    }
}