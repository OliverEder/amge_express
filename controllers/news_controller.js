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

export const register_new = async (req, res, next) => {
    try {
        const {body, file, session} = req;
        
        const noticia = await New.create({
            new_title: body.new_title,
            new_content: body.new_content,
            new_thumbnail: file.originalname,
            new_created_at: moment().format("YYYY-MM-DD HH:mm:ss") , 
            new_status: "A" 
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