
document.addEventListener("DOMContentLoaded", async () =>  {
    const guardar_btn = document.querySelector("#guardar_btn");
    const titulo_input =document.querySelector("#titulo_input");
    const miniatura_input = document.querySelector("#miniatura_input");
    const miniatura_img = document.querySelector("#miniatura_img");
    const fileInput = document.querySelector("#miniatura_input_div input[type=file]");
    const status_select = document.querySelector("#status_select");

    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        const fileName = document.querySelector("#miniatura_input_div .file-name");
        fileName.textContent = fileInput.files[0].name;

        // Mostrar la imagen seleccionada
        const reader = new FileReader();
        reader.onload = (e) => {
            miniatura_img.src = e.target.result;
            miniatura_img.alt = fileInput.files[0].name;
            miniatura_img.style.display = "block"; // Asegurarse de que sea visible
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    };
   
    const editor = document.querySelector("#editor");
    const classic_editor = await ClassicEditor
        .create(editor, {
            toolbar: [
                'heading', 
                '|', 
                'bold', 
                'italic', 
                'link', 
                'bulletedList', 
                'numberedList', 
                'blockQuote',
                'outdent', 
                'indent', '|', // Botones de identación
                'insertTable', '|', // Botón de tablas
                'undo', 'redo'
            ],
           
        })
    const guardar = async (e) => {
        try {
            e.preventDefault();
            
            if(
                titulo_input.value.trim() == "" ||
                classic_editor.getData().trim() == ""
            ){
                Swal.fire({
                    title: "Alerta",
                    text: "Los campos son requeridos",
                    icon: "warning"
                });
                return;
            }

            console.log("status_select:", status_select.value);
            

            const formData = new FormData();
            formData.append("new_title", titulo_input.value);
            formData.append("new_id", titulo_input.getAttribute("new_id"));
            formData.append("new_thumbnail", miniatura_input.files[0]);
            formData.append("new_content", classic_editor.getData());
            formData.append("new_status", status_select.value);

            const base_url = localStorage.getItem("base_url");
    
            // Enviar datos de registro
            const response = await fetch(`${base_url}api/new/${titulo_input.getAttribute("new_id")}`, {
                method: "PUT",
                body: formData
            });
            const result = await response.text();
            
            Swal.fire({
                title: "Registro",
                text: "Registro correcto",
                icon: "success",
                showConfirmButton: true
            }).then(() => {
                console.log("ok");
                window.location.href="/dashboard/noticias";
            })

    
        } catch (error) {
            console.log(error);
        }
    }
    
    guardar_btn.addEventListener("click", guardar);
});

