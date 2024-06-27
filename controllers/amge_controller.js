import {} from "dotenv/config";
import { Prev_association_directive } from "../models/prev_association_directive.js"
import { Prev_association_directive_member } from "../models/prev_association_directive_member.js";
import { User } from "../models/user.js";
import { Delegation } from "../models/delegation.js";
import { User_group } from "../models/user_group.js";
import { Membership } from "../models/membership.js";

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