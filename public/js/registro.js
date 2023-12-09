const reg_email_input = document.querySelector("#reg_email_input");
const reg_password_input = document.querySelector("#reg_password_input");
const reg_confirmation_input = document.querySelector("#reg_confirmation_input");
const reg_names_input = document.querySelector("#reg_names_input");
const reg_lastnames_input = document.querySelector("#reg_lastnames_input");
const reg_birth_input = document.querySelector("#reg_birth_input");
const register_btn = document.querySelector("#register_btn");
const register_form = document.querySelector("#register_form");
const conditions_cb = document.querySelector("#conditions_cb");
const email_update_cb = document.querySelector("#email_update_cb");

//const base_url = document.querySelector("#base_url").getAttribute("base_url");

const fields_validations_registro = [
    {
        field_name: "reg_email_input",
        validations: ["not_empty", "email"],
        warnings: [],
        warning_element: "reg_email_message"
    },
    {
        field_name: "reg_password_input",
        validations: ["not_empty", "min_length-6"],
        warnings: [],
        warning_element: "reg_password_message"
    },
    {
        field_name: "reg_confirmation_input",
        validations: ["not_empty", "min_length-6"],
        warnings: [],
        warning_element: "reg_confirmation_message"
    },
    {
        field_name: "reg_names_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_names_message"
    },
    {
        field_name: "reg_lastnames_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_lastnames_message"
    },
    {
        field_name: "reg_birth_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_birth_message"
    }
];

const register = async (e)=> {
    try {
        e.preventDefault();
        if(!conditions_cb.checked){
            Swal.fire({
                title: "Registro",
                text: "Para continuar es necesario aceptar los Terminos y Condiciones",
                icon: "warning"
            });
            return;
        }
        const formData = new FormData(register_form);
        const fields = Object.fromEntries(formData);
        reset_warnings(fields_validations_registro);
        let validation_result = true;
        for (const field in fields) {
            validation_result = validate(field, fields_validations_registro)
        }
        show_warnings_register();
        if(!validation_result){
            return;
        }
        const form_data = {
            user_email: reg_email_input.value.trim(),
            user_password: reg_password_input.value.trim(),
            user_names: reg_names_input.value.trim(),
            user_last_names: reg_lastnames_input.value.trim(),
            user_birth: reg_birth_input.value.trim(),
            user_email_updates: email_update_cb.checked ? 1 : 0
        }
        // Enviar datos de registro
        const response = await fetch(`${base_url}api/user/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams(form_data)
        });

        const result = await response.json();
        console.log(result);
        if(result.error){
            Swal.fire({
                title: "Registro",
                text: result.error,
                icon: "warning"
            });
            return;
        }

        Swal.fire({
            title: "Registro",
            text: result.response,
            icon: "success"
        });

        setTimeout(() => {
            window.location.href="/";
        },1000);

        
    } catch (error) {
        console.log(error);
    }
    
    
}   

const show_warnings_register = () => {
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

register_btn.addEventListener("click", register);

reg_confirmation_input.addEventListener("keyup", (e) => {
    e.preventDefault();
    if(reg_password_input.value.trim()== ""){
        return;
    }   
});
