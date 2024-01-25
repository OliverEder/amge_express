const reg_email_input = document.querySelector("#reg_email_input");
const reg_password_input = document.querySelector("#reg_password_input");
const reg_confirmation_input = document.querySelector("#reg_confirmation_input");
const reg_phone_input = document.querySelector("#reg_phone_input");
const reg_nationality_input = document.querySelector("#reg_nationality_input");
const reg_names_input = document.querySelector("#reg_names_input");
const reg_lastnames_input = document.querySelector("#reg_lastnames_input");
const reg_birth_input = document.querySelector("#reg_birth_input");
const register_btn = document.querySelector("#register_btn");
const reg_address_input = document.querySelector("#reg_address_input");
const reg_blood_type_input = document.querySelector("#reg_blood_type_input");
const register_form = document.querySelector("#register_form");
const conditions_cb = document.querySelector("#conditions_cb");
const email_update_cb = document.querySelector("#email_update_cb");
const back_btn = document.querySelector("#back_btn");

const membership_section = document.querySelector("#membership_section");
const personal_section = document.querySelector("#personal_section");
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
        field_name: "reg_phone_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_phone_message"
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
    },
    {
        field_name: "reg_nationality_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_nationality_message"
    },
    {
        field_name: "reg_address_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_address_message"
    },
    {
        field_name: "reg_blood_type_input",
        validations: ["not_empty"],
        warnings: [],
        warning_element: "reg_blood_type_message"
    },
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
        let register_validation_result = true;
        for (const field in fields) {
            if(!validate(field, fields_validations_registro)){
                register_validation_result = false;
            }
        }
        show_warnings_register();
        if(!register_validation_result){
            return;
        }
        const form_data = {
            user_email: reg_email_input.value.trim(),
            user_password: reg_password_input.value.trim(),
            user_names: reg_names_input.value.trim(),
            user_last_names: reg_lastnames_input.value.trim(),
            user_phone: reg_phone_input.value.trim(),
            user_birth: reg_birth_input.value.trim(),
            user_email_updates: email_update_cb.checked ? 1 : 0,
            user_nationality: reg_nationality_input.value.trim(),
            user_address: reg_address_input.value.trim(),
            user_blood_type: reg_blood_type_input.value.trim()
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
            text: "Se registro el usuario correctamente",
            icon: "success"
        });
        console.log("last");
        setTimeout(() => {
            window.location.href="/";
        },1000);

        
    } catch (error) {
        console.log(error);
    }
    
    
}   

const show_warnings_register = () => {
    fields_validations_registro.forEach(field_validations => {
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

const confirmation = (e) => {
    e.preventDefault();
    if(
        reg_password_input.value.trim() === "" || 
        reg_confirmation_input.value.trim() === ""
    ){ return; }   
    
    const reg_confirmation_message = document.querySelector("#reg_confirmation_message");

    if(reg_confirmation_input.value.trim() !== reg_password_input.value.trim()){
        reg_confirmation_message.innerText = "La confirmación debe ser igual que la contraseña";
        return;
    } 

    if(reg_confirmation_input.value.trim() === reg_password_input.value.trim()){
        reg_confirmation_message.innerText = "";
        return;
    }    
}

register_btn.addEventListener("click", register);

reg_confirmation_input.addEventListener("change", confirmation);

reg_password_input.addEventListener("change", confirmation);

back_btn.addEventListener("click", (e) => {
    e.preventDefault();
    membership_section.classList.add("is-hidden");
    
} );