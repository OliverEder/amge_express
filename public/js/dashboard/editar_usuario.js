const guardar_btn = document.querySelector("#guardar_btn");
const user_email = document.querySelector("#user_email");
const user_avatar = document.querySelector("#user_avatar");
const user_names = document.querySelector("#user_names");
const user_last_names = document.querySelector("#user_last_names");
const user_birth = document.querySelector("#user_birth");
const user_phone = document.querySelector("#user_phone");
const user_nationality = document.querySelector("#user_nationality");
const user_address = document.querySelector("#user_address");
const user_cp = document.querySelector("#user_cp");
const user_blood_type = document.querySelector("#user_blood_type");
const user_password = document.querySelector("#user_password");
const user_password_confirm = document.querySelector("#user_password_confirm");
const user_created_at = document.querySelector("#user_created_at");
const user_modified_at = document.querySelector("#user_modified_at");
const user_email_updates = document.querySelector("#user_email_updates");
const user_group_id = document.querySelector("#user_group_id");
const delegation_id = document.querySelector("#delegation_id");
const user_status = document.querySelector("#user_status");

const validatePasswords = () => {
    if (user_password.value && user_password.value !== user_password_confirm.value) {
        user_password_confirm.setCustomValidity("Las contraseñas no coinciden.");
    } else {
        user_password_confirm.setCustomValidity("");
    }
};

const guardar = async (e) => {
    try {
        e.preventDefault();
        if (
            !user_email.value || 
            !user_names.value || 
            !user_last_names.value || 
            !user_status.value
        ) {
            Swal.fire({
                title: "Alerta",
                text: "Los campos Correo Electrónico, Nombres, Apellidos y Estado del Usuario son requeridos.",
                icon: "warning"
            });
            return;
        }

        if (
            user_password.value && 
            user_password.value !== user_password_confirm.value
        ) {
            Swal.fire({
                title: "Alerta",
                text: "Las contraseñas no coinciden.",
                icon: "warning"
            });
            return;
        }
        const user_id = user_email.getAttribute("user_id");
        const form_data = {
            user_email: user_email.value,
            user_avatar: user_avatar.value,
            user_names: user_names.value,
            user_last_names: user_last_names.value,
            user_birth: user_birth.value,
            user_phone: user_phone.value,
            user_nationality: user_nationality.value,
            user_address: user_address.value,
            user_cp: user_cp.value,
            user_blood_type: user_blood_type.value,
            user_password: user_password.value,
            user_created_at: user_created_at.value,
            user_modified_at: user_modified_at.value,
            user_email_updates: user_email_updates.value,
            user_group_id: user_group_id.value,
            delegation_id: delegation_id.value,
            user_status: user_status.value
        };
        

        // Enviar datos de registro
        const base_url = localStorage.getItem("base_url");
        const response = await fetch(`${base_url}api/user/${user_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams(form_data)
        });

        const result = await response.json();

        Swal.fire({
            title: "Registro",
            text: result.mensaje,
            icon: "success",
            showConfirmButton: true
        }).then(() => {
            console.log("ok");
            window.location.href="/dashboard/usuarios/";
        })


    } catch (error) {
        console.log(error);
    }
}

user_password.addEventListener("input", validatePasswords);
user_password_confirm.addEventListener("input", validatePasswords);
guardar_btn.addEventListener("click", guardar);