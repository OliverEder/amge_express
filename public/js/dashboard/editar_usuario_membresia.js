const nueva_membresia_btn = document.querySelector("#nueva_membresia_btn");
const nueva_membresia_modal = document.querySelector("#nueva_membresia_modal");
const close_modal = document.querySelector("#close_modal");
const close_notification = document.querySelector("#close_notification");
const guardar_mebresia_btn = document.querySelector("#guardar_mebresia_btn");

nueva_membresia_btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    nueva_membresia_modal.classList.add("is-active");
});

close_modal.addEventListener("click", (e) => {
    nueva_membresia_modal.classList.remove("is-active");
});

close_notification.addEventListener("click", (e) => {
    e.preventDefault();
    notification_membresia.classList.add("is-hidden");
});

guardar_mebresia_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const tipo_membresia_select = document.querySelector("#tipo_membresia_select");
    const fecha_inicio_input = document.querySelector("#fecha_inicio_input");
    const notification_membresia = document.querySelector("#notification_membresia");
    notification_membresia.classList.add("is-hidden");
    if(
        tipo_membresia_select.value == "" || 
        fecha_inicio_input.value == ""
    ){
        notification_membresia.classList.remove("is-hidden");
    }


})