const add_pregunta_btns = document.querySelectorAll(".add_pregunta_btn");
const add_opcion_btns = document.querySelectorAll(".add_opcion_btn");
const preguntas = document.querySelector("#preguntas");
const titulo_input = document.querySelector("#titulo_input");
const descripccion_textarea = document.querySelector("#descripccion_textarea");
const status_select = document.querySelector("#status_select");
const guardar_btn = document.querySelector("#guardar_btn");

const agregar_pregunta = (e) => {
    
    const pregunta_actual = parseInt(e.target.getAttribute("pregunta"));
    const pregunta_nueva = document.createElement("div");
    pregunta_nueva.classList.add("pregunta", "mb-5");
    pregunta_nueva.id = `pregunta_div_${pregunta_actual+1}`;
    pregunta_nueva.innerHTML = `
        <div class="columns has-background-info-light" pregunta="${pregunta_actual+1}">
            <div class="column is-10">
                <div class="field">
                    <label class="label">Pregunta</label>
                    <div class="control">
                        <input class="input pregunta_input" type="text" placeholder="Text input" id="pregunta_input_${pregunta_actual+1}">
                    </div>
                    </div>
            </div>

            <div class="column">
                <button class="button is-info mt-5 add_pregunta_btn" pregunta="${pregunta_actual+1}">+</button> 
                <button class="button is-danger mt-5 remove_pregunta_btn" pregunta="${pregunta_actual+1}">-</button>
            </div>
        </div>
        <div id="opciones_pregunta_${pregunta_actual+1}" pregunta="${pregunta_actual+1}">
            <div class="opcion" id="opcion_div_1" pregunta="${pregunta_actual+1}" opcion="1">
                <div class="columns has-background-success-light" >
                    <div class="column is-10">
                        <div class="field">
                            <label class="label">Opcion</label>
                            <div class="control">
                                <input class="input opcion_input" type="text" placeholder="Text input" id="${pregunta_actual+1}">
                            </div>
                            </div>
                    </div>

                    <div class="column">
                        <button class="button is-info mt-5 add_opcion_btn" pregunta="${pregunta_actual+1}" opcion="1" >+</button> 
                    </div>
                </div>
            </div>
        </div>            
    `;

    preguntas.appendChild(pregunta_nueva);

    const nuevo_add_pregunta_btns = document.querySelectorAll(".add_pregunta_btn");
    nuevo_add_pregunta_btns.forEach(add_pregunta_btn => {
        add_pregunta_btn.addEventListener("click", agregar_pregunta);
    });

    const nuevo_remove_pregunta_btns = document.querySelectorAll(".remove_pregunta_btn");
    nuevo_remove_pregunta_btns.forEach(remove_pregunta_btn => {
        remove_pregunta_btn.addEventListener("click", eliminar_pregunta);
    });

    const nuevo_add_opcion_btns = document.querySelectorAll(".add_opcion_btn");
    nuevo_add_opcion_btns.forEach(add_opcion_btn => {
        add_opcion_btn.addEventListener("click", agregar_opcion);
    });

} 

const eliminar_pregunta = (e) => {
    const pregunta_actual = e.target.getAttribute("pregunta");
    console.log(pregunta_actual);
    const pregunta_actual_div = document.querySelector(`#pregunta_div_${pregunta_actual}`);
    pregunta_actual_div.remove();
}

const agregar_opcion = (e) => {
    const opcion_actual = parseInt(e.target.getAttribute("opcion"));
    const pregunta_actual = parseInt(e.target.getAttribute("pregunta"));
    const pregunta_actual_div = document.querySelector(`#pregunta_div_${pregunta_actual}`);
    console.log("pregunta_actual_div", pregunta_actual_div);
    
    const opciones_pregunta = pregunta_actual_div.querySelector(`#opciones_pregunta_${pregunta_actual}`);
    const opcion_nueva = document.createElement("div");
    opcion_nueva.classList.add("opcion");
    opcion_nueva.id = `opcion_div_${opcion_actual+1}`;
    opcion_nueva.setAttribute("pregunta", opcion_actual+1);
    opcion_nueva.setAttribute("opcion", opcion_actual+1);
    opcion_nueva.innerHTML = `
        <div class="columns has-background-success-light" >
            <div class="column is-10">
                <div class="field">
                    <label class="label">Opcion</label>
                    <div class="control">
                        <input class="input opcion_input" type="text" placeholder="Text input" id="opcion_input_${opcion_actual+1}">
                    </div>
                    </div>
            </div>

            <div class="column">
                <button class="button is-info mt-5 add_opcion_btn" pregunta="${pregunta_actual}" opcion="${opcion_actual+1}" >+</button> 
                <button class="button is-danger mt-5 remove_opcion_btn" pregunta="${pregunta_actual}" opcion="${opcion_actual+1}">-</button>
            </div>
        </div>
    `;

    opciones_pregunta.appendChild(opcion_nueva);

    const nuevo_add_opcion_btns = document.querySelectorAll(".add_opcion_btn");
    nuevo_add_opcion_btns.forEach(add_opcion_btn => {
        add_opcion_btn.addEventListener("click", agregar_opcion);
    });

    const nuevo_remove_opcion_btns = document.querySelectorAll(".remove_opcion_btn");
    nuevo_remove_opcion_btns.forEach(remove_opcion_btn => {
        remove_opcion_btn.addEventListener("click", eliminar_opcion);
    });
}

const eliminar_opcion = (e) => {
    const opcion_actual = e.target.getAttribute("opcion");
    const opcion_actual_div = document.querySelector(`#opcion_div_${opcion_actual}`);
    opcion_actual_div.remove();
}

const guardar = async (e) => {
    e.preventDefault();
    const pregunta_inputs = document.querySelectorAll(".pregunta_input");
    const opcion_inputs = document.querySelectorAll(".opcion_input");
    // Validacion de campos
    const errors = [];
    titulo_msg.classList.add("is-hidden");
    descripccion_msg.classList.add("is-hidden");
    status_msg.classList.add("is-hidden");

    if(titulo_input.value.trim() == ""){
        const titulo_msg = document.querySelector("#titulo_msg");
        titulo_msg.classList.remove("is-hidden");
        errors.push(true);
        
    }

    if(descripccion_textarea.value.trim() == ""){
        const descripccion_msg = document.querySelector("#descripccion_msg");
        descripccion_msg.classList.remove("is-hidden");
        errors.push(true);
        
    }

    if(status_select.value.trim() == ""){
        const status_msg = document.querySelector("#status_msg");
        status_msg.classList.remove("is-hidden");
        errors.push(true);
        
    }

    pregunta_inputs.forEach(pregunta_input => {
        if(pregunta_input.value.trim() == ""){
            errors.push(true);
        }
    });

    opcion_inputs.forEach(opcion_input => {
        if(opcion_input.value.trim() == ""){
            errors.push(true);
        }
    });

    if(errors.length > 1){
        Swal.fire({
            title: "Alerta",
            text: "Existen alertas que atender en el formulario",
            icon: "warning",
            showConfirmButton: true
        })
        e.target.removeAttribute("disabled");
        return;
    }
   
    const preguntas_array = [];
    
    // Captura de la información
    // Captura de todas las preguntas
    const preguntas = document.querySelectorAll(".pregunta");
    preguntas.forEach(pregunta => {
        const pregunta_obj = {
            pregunta: "",
            opciones: []
        };
        const pregunta_input = pregunta.querySelector(".pregunta_input");
        const opcion_inputs = pregunta.querySelectorAll(".opcion_input");

        pregunta_obj.pregunta = pregunta_input.value;

        opcion_inputs.forEach(opcion_input => {
            pregunta_obj.opciones.push(opcion_input.value)
        })

        preguntas_array.push(pregunta_obj);
    });

    console.log("preguntas_array:", preguntas_array);
    const form_data = {
        vote_title: titulo_input.value,
        vote_description:descripccion_textarea.value,
        vote_status: status_select.value,
        preguntas: JSON.stringify(preguntas_array)
    }
    // Enviar datos de registro
    const base_url = localStorage.getItem("base_url");
    const response = await fetch(`${base_url}api/vote/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(form_data)
    });

    const result = await response.json();
    console.log("result:", result);
    

}

add_pregunta_btns.forEach(add_pregunta_btn => {
    add_pregunta_btn.addEventListener("click", agregar_pregunta);
});

add_opcion_btns.forEach(add_opcion_btn => {
    add_opcion_btn.addEventListener("click", agregar_opcion);
});

guardar_btn.addEventListener("click", guardar);