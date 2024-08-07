import { Vote } from "../models/vote.js";


export const votaciones = async(req, res, next) => {
    try {
        const { session } = req;

        const elections = await Vote.findAll();

        res.render("dashboard/votaciones", {
            base_url: process.env.BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            elections: elections
        
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
    
}

export const votacion_registro = async(req, res, next) => {
    try {
        const { session } = req;

        const elections = await Vote.findAll();

        res.render("dashboard/votacion_registro", {
            base_url: process.env.BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            elections: elections
        
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
    
}

export const api_votacion_registro = async (req, res, next) =>  {
    try {
        const {body} = req;

        res.json(body);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}