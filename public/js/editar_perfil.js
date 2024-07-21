const user_id = document.querySelector("#user_id");
const reg_names_input = document.querySelector("#reg_names_input");
const reg_lastnames_input = document.querySelector("#reg_lastnames_input");
const reg_email_input = document.querySelector("#reg_email_input");
const reg_password_input = document.querySelector("#reg_password_input");
const reg_confirmation_input = document.querySelector("#reg_confirmation_input");
const reg_phone_input = document.querySelector("#reg_phone_input");
const reg_nationality_input = document.querySelector("#reg_nationality_input");
const reg_birth_input = document.querySelector("#reg_birth_input");
const reg_address_input = document.querySelector("#reg_address_input");
const reg_blood_type_input = document.querySelector("#reg_blood_type_input");
const password_anterior = document.querySelector("#password_anterior");
const guardar_btn = document.querySelector("#guardar_btn");
const cancelar_btn = document.querySelector("#cancelar_btn");

const btn_edita_imagen = document.querySelector("#btn_edita_imagen");
const content_img_editar = document.querySelector('.img-editar');
let cropper = "";

function mostrar_alerta_error(msg){
    Swal.fire({
        title: "Error",
        text: result.error,
        icon: "warning"
    });
}

const guarda_datos_editados = async ()=>{
    try {
        let img_src = "";
        //Validando campos
        const campos_validar = document.querySelectorAll(".valid");
        for (let campo of campos_validar) {
            if (campo.value.trim() === "") {
                mostrar_alerta_error(campo.dataset.msg);
                return;
            }
        }
        //Validando contraseña
        if (reg_password_input.value.trim() != reg_confirmation_input.value.trim()) {
            mostrar_alerta_error("Las contraseñas no son iguales.");
            return;
        }
        if(cropper !== "") {
            img_src = cropper.getCroppedCanvas({
                width: 200,
                minWidth: 100,
                maxWidth: 500,
                imageSmoothingQuality: 'high'
            }).toDataURL();
            
            
            // Crear formData para enviar al servidor
            const form_data = new FormData();
            form_data.append('user_id', user_id.value);
            form_data.append('user_email', reg_email_input.value.trim());
            form_data.append('user_password_edit', reg_password_input.value.trim());
            form_data.append('user_password_anterior', password_anterior.value);
            form_data.append('user_names', reg_names_input.value.trim());
            form_data.append('user_last_names', reg_lastnames_input.value.trim());
            form_data.append('user_phone', reg_phone_input.value.trim());
            form_data.append('user_birth', reg_birth_input.value.trim());
            form_data.append('user_nationality', reg_nationality_input.value.trim());
            form_data.append('user_address', reg_address_input.value.trim());
            form_data.append('user_blood_type', reg_blood_type_input.value.trim());
            form_data.append('user_avatar', img_src);
            // Enviar datos de registro
            const response = await fetch(`${base_url}api/user/editar_registro`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: new URLSearchParams(form_data)
            });
    
            const result = await response.text();
            console.log("result:", result);
            /* if(result.error){
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
            
            setTimeout(() => {
                // window.location.href="/";
                window.location.href=`/perfil/${user_id.value}`;
            },1000); */
        }

        

    } catch (error) {
        console.log(error);
    }
}

const edita_imagen_perfil = (e) => {
    const reader = new FileReader();
    reader.onload = e => {
        // Si la imagen a editar es cargada de manera correcta
        if(e.target.result) {
            // Crear nueva imagen a editar
            console.log("Se carga imagen ");
            let img = document.createElement('img');
            img.src = e.target.result;
            // limiar el resultado anterior
            while(content_img_editar.firstElementChild) {
                content_img_editar.removeChild(content_img_editar.firstElementChild);
            }
            // Agregar nueva imagen al contenedor donde se editará
            content_img_editar.appendChild(img);
            // Configurar edición de imágen (radio proporcional, responsivo y
            // un minímo de alto para el contenedor donde se edita la imagen)
            cropper = new Cropper(img, {
                aspectRatio: 16 /16,
                responsive: true,
                minContainerHeight: 200
            });
        }
    }
    // Permite leer el archivo de imagen y que se muestre en el contenedor donde será editada
    reader.readAsDataURL(e.target.files[0]);
}

btn_edita_imagen.addEventListener("change", edita_imagen_perfil);
guardar_btn.addEventListener("click", guarda_datos_editados);
cancelar_btn.addEventListener("click", ()=> window.history.back());