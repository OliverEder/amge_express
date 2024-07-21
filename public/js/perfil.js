
let content_img_editar = document.querySelector('.img-editar');
let cropper = "";

const edita_imagen_perfil = (e) => {
    console.log(e,"============E");
    const reader = new FileReader();
    
    reader.onload = e => {
        // Si la imagen a editar es cargada de manera correcta
        if(e.target.result) {
            // Crear nueva imagen a editar
            let img = document.createElement('img');
            img.src = e.target.result;
            console.log(img.src,"==================resS");
            // limiar el resultado anterior
            while(content_img_editar.firstElementChild) {
                content_img_editar.removeChild(content_img_editar.firstElementChild);
            }
            // Agregar nueva imagen al contenedor donde se editará
            content_img_editar.appendChild(img);
            /**
             * Configurar edición de imágen (radio proporcional, responsivo y
             * un minímo de alto para el contenedor donde se edita la imagen)
            */
            cropper = new Cropper(img, {
                aspectRatio: 16 / 16,
                rounded: true,
                responsive: true,
                rotatable: true,
                scalable: true,
                minContainerHeight: 250
            });
        }
    }
    // Permite leer el archivo de imagen y que se muestre en el contenedor donde será editada
    reader.readAsDataURL(e.target.files[0]);

    let img_src = "";
    if(cropper !== ""){
        img_src = cropper.getCroppedCanvas({
            width: 300,
            minWidth: 100,
            maxWidth: 1200,
            imageSmoothingQuality: 'high'
        }).toDataURL();
    }
    const form_data = new FormData();
    form_data.append("user_image", img_src);
    for (const value of form_data.values()) {
        console.log(value,"================Values");
      }
}