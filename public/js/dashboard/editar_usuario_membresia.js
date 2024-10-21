const nueva_membresia_btn = document.querySelector("#nueva_membresia_btn");
const nueva_membresia_modal = document.querySelector("#nueva_membresia_modal");
const close_modal = document.querySelector("#close_modal");
const close_notification = document.querySelector("#close_notification");
const guardar_mebresia_btn = document.querySelector("#guardar_mebresia_btn");
const membership_tbody = document.querySelector("#membership_tbody");

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

guardar_mebresia_btn.addEventListener("click", async (e) => {
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

    // Reunir datos
    const data = {
        tipo_membresia_id: tipo_membresia_select.value,
        fecha_inicio: fecha_inicio_input.value,
        user_id: user_email.getAttribute("user_id")
    }
    // Petición fetch
    const base_url = localStorage.getItem("base_url");
    const response = await fetch(`${base_url}api/membership/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(data)
    });

    const result = await response.json();
    const {cat_membership_type, new_membership} = result;
    // Agregar una nueva fila a la tabla
    const tr = document.createElement("tr")
    tr.innerHTML = `
        <td>${cat_membership_type.cat_membership_type_name} </td>
        <td>${new_membership.membership_created_at}</td>
        <td>${new_membership.membership_status == "A" ? "Activa" : "Inactiva"}</td>
    `;
    membership_tbody.appendChild(tr)
    // Cerrar el modal
    nueva_membresia_modal.classList.remove("is-active");
})