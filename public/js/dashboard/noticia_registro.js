
document.addEventListener("DOMContentLoaded", async () =>  {
    const guardar_btn = document.querySelector("#guardar_btn");
    const titulo_input =document.querySelector("#titulo_input");
   
    const editor = document.querySelector("#editor");
    const classic_editor = await ClassicEditor
        .create(editor, {
            ckfinder: {
                uploadUrl: '/upload' // URL para subir imágenes
            }
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
    
            const form_data = {
                title: titulo_input.value,
                content: classic_editor.getData()
            }
    
            const base_url = localStorage.getItem("base_url");
    
            // Enviar datos de registro
            const response = await fetch(`${base_url}api/new/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: new URLSearchParams(form_data)
            });
            const result = await response.json();
            
            console.log("result:", result);
    
        } catch (error) {
            console.log(error);
        }
    }
    
    guardar_btn.addEventListener("click", guardar);
});