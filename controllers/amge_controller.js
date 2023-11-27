import {} from "dotenv/config";
import {Prev_association_directive} from "../models/prev_association_directive.js"
import { Prev_association_directive_member } from "../models/prev_association_directive_member.js";

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
            user_email:  session.logged ? session.user_email : ""
        });
    } catch (error) {
        console.log(error);
    }
}