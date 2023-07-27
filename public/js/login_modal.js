const login_btn = document.querySelector("#login_btn");
const modal_login = document.querySelector(".modal_login");
const close_login_modal_btn = document.querySelector("#close_login_modal_btn");
const modal_background_login = document.querySelector(".modal_background_login"); 
const ver_password = document.querySelector("#ver_password");
const password_input = document.querySelector("#password_input");
const ver_password_check = document.querySelector("#ver_password_check");
const login_modal_card = document.querySelector("#login_modal_card");
const login_modal_cancelar = document.querySelector("#login_modal_cancelar");

const close_login_modal_function = (e) => {
    e.preventDefault();
    modal_login.classList.remove("is-active");
}

login_btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal_login.classList.add("is-active");
    login_modal_card.classList.add("animate__fadeInDown");
})

close_login_modal_btn.addEventListener("click", close_login_modal_function);
modal_background_login.addEventListener("click", close_login_modal_function);
login_modal_cancelar.addEventListener("click", close_login_modal_function);

ver_password_check.addEventListener("click", (e) => {
    console.log(password_input.getAttribute("type"));
    if(password_input.getAttribute("type") == "password"){
        password_input.setAttribute("type", "text");
        //ver_password_check.setAttribute("checked", true);
    }else{
        password_input.setAttribute("type", "password");
        //ver_password_check.removeAttribute("checked");
    }
} );