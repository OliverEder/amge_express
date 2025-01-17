
const login_btn = document.querySelector("#login_btn");
const logout_btn = document.querySelector("#logout_btn");
const modal_login = document.querySelector(".modal_login");
const close_login_modal_btn = document.querySelector("#close_login_modal_btn");
const modal_background_login = document.querySelector(".modal_background_login"); 
const ver_password = document.querySelector("#ver_password");
const password_input = document.querySelector("#password_input");
const ver_password_check = document.querySelector("#ver_password_check");
const login_modal_card = document.querySelector("#login_modal_card");
const login_modal_cancelar = document.querySelector("#login_modal_cancelar");
const login_modal_send_btn = document.querySelector("#login_modal_send_btn");
const email_input = document.querySelector("#email_input");
const login_form = document.querySelector("#login_form");
const base_url = document.querySelector("#base_url").getAttribute("base_url");


const close_login_modal_function = (e) => {
    e.preventDefault();
    modal_login.classList.remove("is-active");
}
if(login_btn){
    login_btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal_login.classList.add("is-active");
        login_modal_card.classList.add("animate__fadeInDown");
    })
}




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

const fields_validations = [
    {
        field_name: "email_input",
        validations: ["not_empty", "email"],
        warnings: [],
        warning_element: "email_message"
    },
    {
        field_name: "password_input",
        validations: ["not_empty", "min_length-6"],
        warnings: [],
        warning_element: "password_message"
    }
];

const logout = async (e) => {
    try {
        e.preventDefault();
        const user_id = window.localStorage.getItem("user_id");
        
        const form_data = {
            user_id: user_id,         
            sesion_id: window.localStorage.getItem('sesion_id')   
        }

        // Enviar datos de registro
        const response = await fetch(`${base_url}api/user/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams(form_data)
        });
        const result = await response.json();

        localStorage.clear();
        setTimeout(() => {
            window.location.href="/";
        },500);
    } catch (error) {
        console.log(error);
    }
}

const login = async (e) => {
    try {
        e.preventDefault();
        // Se obtienen los campos
        const formData = new FormData(login_form);
        const fields = Object.fromEntries(formData);
        // Funcion para resetar todas las alertas del formulario
        reset_warnings(fields_validations);
        let validation_result = true;
        for (const field in fields) {
            validation_result = validate(field, fields_validations)
        }
        show_warnings();
        if(!validation_result){
            return;
        }
        const form_data = {
            user_email: email_input.value.trim(),
            user_password: password_input.value.trim(),
        }
        // Enviar datos de registro
        const response = await fetch(`${base_url}api/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams(form_data)
        });
        const result = await response.json();
        
        if(result.errors.length != 0){
            Swal.fire({
                title: "Inicio de sesión",
                text: result.errors[0].msg,
                icon: "warning"
            });
            return; 
        }
        
        Swal.fire({
            title: "Sesión iniciada",
            showConfirmButton: false,
        });
        window.localStorage.clear();
        window.localStorage.setItem("base_url", base_url);
        window.localStorage.setItem("token", result.token);
        window.localStorage.setItem("user_id", result.user_id );
        window.localStorage.setItem("user_email", result.user_email );
        window.localStorage.setItem("user_group_id", result.user_group_id );
        window.localStorage.setItem("user_group_name", result.user_group_name);
        window.localStorage.setItem("user_names", result.user_names);
        window.localStorage.setItem("user_last_names", result.user_last_names);
        window.localStorage.setItem("sesion_id", result.sesion_id);
        if(result.membresia){
            window.localStorage.setItem("membership_status", result.membresia.membership_status);
        }
        

        setTimeout(() => {
            window.location.href="/";
        },1000);
        
    } catch (error) {
        console.log(error);
    }
}

const show_warnings = () => {
    fields_validations.forEach(field_validations => {
        const field = document.querySelector(`#${field_validations.field_name}`);
        const warning_element = document.querySelector(`#${field_validations.warning_element}`);
        
        if(field_validations.warning_element == ""){
            return;
        }

        if(field_validations.warnings.length == 0){
            field.classList.remove("is-danger");
            warning_element.innerText = "";
            return;
        }
        
        warning_element.innerText = "";
        field_validations.warnings.forEach(warning => {
            warning_element.innerText = warning;
        });
        
        field.classList.add("is-danger");
    });
}

if(login_modal_send_btn){
    login_modal_send_btn.addEventListener("click", login);
}


if(logout_btn){
    logout_btn.addEventListener("click", logout);
}
