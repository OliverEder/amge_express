const reg_email_input = document.querySelector("#reg_email_input");
const reg_password_input = document.querySelector("#reg_password_input");
const reg_confirmation_input = document.querySelector("#reg_confirmation_input");
const reg_names_input = document.querySelector("#reg_names_input");
const reg_lastnames_input = document.querySelector("#reg_lastnames_input");
const register_btn = document.querySelector("#register_btn");

const register = (e)=> {
    e.preventDefault();
    console.log("Dream");
}   

register_btn.addEventListener("click", register);
