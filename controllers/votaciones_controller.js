import { Answer } from "../models/answer.js";
import { Vote } from "../models/vote.js";
import { Question } from "../models/question.js";
import { Option } from "../models/option.js";
import { Membership } from "../models/membership.js";

import moment from "moment";

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

export const votacion_contestar = async (req, res, next) => {
    try {
        const {
            params, 
            session
        } = req;
        const errors = [];
        // * Diseño de la pagina
        // * Validar que el usuario este logueado
        // * Validar si la votación esta activa
        const vote = await Vote.findOne({
            where: {
                vote_id: params.vote_id,
                vote_status: "A"
            }
        }); 
        if(!vote){
            errors.push("La votacion esta inactiva");
        }

        // * Validar que el usuario tenga membresia activa
        const membership = await Membership.findOne({
            where: {
                user_id: session.user_id,
                membership_status: "A"
            }
        })
        if(!membership){
            errors.push("Para poder votar se debe tener la membresia activa");
        }
        
        // * Validar que el usuario no haya votado anteriormente
        const answer = await Answer.findOne({
            where: {
                user_id: session.user_id,
                vote_id: params.vote_id,
                answer_status: "A"
            }
        });
        if(answer){
            errors.push("Solamente se puede votar una vez");
        }
        // * Consulta de votacion, preguntas y opciones
        Vote.hasMany(Question,
            {
                foreignKey: {
                  name: 'vote_id',
                },
            }
        );

        Question.hasMany(Option,
            {
                foreignKey: {
                  name: 'question_id',
                },
            }
        );
        const votacion = await Vote.findOne({
            where: {vote_id: params.vote_id},
            include: [
                {
                    model:Question,
                    include: [{model:Option}]
                }
            ]
        });
        // * Mostrar primera pregunta y opciones
        // * Capturar respuestas
        // * Registrar votos
        // Pantalla que indique que ya votó
        // Pantalla que indique que no le es posible votar
        
        
        res.render("votacion", {
            base_url: process.env.BASE_URL,
            logged: session.logged ? session.logged : false,
            user_id: session.logged ? session.user_id : "",
            user_email:  session.logged ? session.user_email : "",
            votacion: votacion,
            errors: errors
        });


    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const api_votacion_registro = async (req, res, next) =>  {
    try {
        const {body} = req;
        const vote = await Vote.create({
            vote_title: body.vote_title,
            vote_description: body.vote_description,
            vote_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            vote_expiration_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            vote_release_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            vote_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            vote_status: body.vote_status
        });
        const questions = JSON.parse(body.questions);
        for (const question of questions) {
            const new_question = await Question.create({
                question_content: question.pregunta,
                question_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                question_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                vote_id: vote.vote_id,
                question_status: "A"
            });

            for (const option of question.options) {
                const new_option = await Option.create({
                    option_content: option,
                    option_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    option_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    question_id: new_question.question_id,
                    option_status: "A"
                });
            }
        }
        
        res.json({response: "La votación se registro correctamente"});
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const api_registrar_respustas = async (req, res, next) =>  {
    try {
        const {body} = req;
        
        // * Validar que el usuario no haya votado anteriormente
        const answer = await Answer.findOne({
            where: {
                user_id: body.user_id,
                vote_id: body.vote_id,
                answer_status: "A"
            }
        });
        if(answer){
            res.status(400).json(
                { error:"No puede votar nuevamente" }
            );
            return;
        }
        const questions = JSON.parse(body.questions);

        for (const question of questions) {
            console.log("question", question);
            
            const new_answare = await Answer.create({
                user_id: body.user_id,
                option_id: question.option,
                vote_id: body.vote_id,
                answer_created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                answer_modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                answer_status: "A"
            });
        }
        

        res.json(body);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}