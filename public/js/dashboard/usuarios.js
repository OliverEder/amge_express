const buscar_input = document.querySelector("#buscar_input");
const tbody_paginada = document.querySelector("#tbody_paginada");
const tbody_busqueda = document.querySelector("#tbody_busqueda");


document.addEventListener("DOMContentLoaded", () => {
    build_active_users_chart();
    memberships_chart();
    build_sessions_record_chart();
})

const build_active_users_chart = () => {
    const active_users_chart = document.querySelector("#active_users_chart");
    var data = [{
        values: [100, 26],
        labels: ['Activos', 'Inactivos'],
        type: 'pie'
      }];
      
    var layout = {
        title: 'Usuarios activos e inactivos',
        height: 400,
        width: 500
    };
      
    Plotly.newPlot(active_users_chart, data, layout);
}

const memberships_chart = () => {
    const memberships_chart = document.querySelector("#memberships_chart");
    var data = [{
        values: [40, 150],
        labels: ['Expiradas','Por expirar'],
        type: 'pie'
      }];
      
    var layout = {
        title: 'Membresias',
        height: 400,
        width: 500
    };
      
    Plotly.newPlot(memberships_chart, data, layout);
} 

const build_sessions_record_chart = () => {
    const sessions_record_chart = document.querySelector("#sessions_record_chart");
    var data = [
        {
          x: ['2023-10-04', '2023-10-05', '2023-10-06', '2023-10-07', '2023-10-08', '2023-10-09'],
          y: [12, 20, 16, 16, 16, 10],
          type: 'scatter'
        }
    ];

    var layout = {
        title: 'Registro historico de sesiones',
    };
      
    Plotly.newPlot(sessions_record_chart, data, layout);
}

buscar_input.addEventListener("keyup", async (e) => {
    try {
        const paginacion_div = document.querySelector("#paginacion_div");
        if(e.target.value.trim() == ""){
            tbody_paginada.classList.remove("is-hidden");
            paginacion_div.classList.remove("is-hidden");
            tbody_busqueda.classList.add ("is-hidden");
            return ;
        }
        tbody_busqueda.innerHTML = "";
        tbody_paginada.classList.add("is-hidden");
        paginacion_div.classList.add("is-hidden");
        tbody_busqueda.classList.remove("is-hidden");
        const form_data = {
            busqueda: e.target.value,
        };
        

        // Enviar datos de registro
        const base_url = localStorage.getItem("base_url");
        const response = await fetch(`${base_url}api/user/buscar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams(form_data)
        });

        const result = await response.json();
        console.log("result", result);
        
        result.forEach(user => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${user.user_id}</td>
                <td>${user.user_email}</td>
                <td>${user.user_last_names} ${user.user_names}</td>
                <td></td>
                <td>${user.user_group.user_group_name}</td>
                <td>${user.user_status == "A" ? "Activo" : ""}</td>
                <td>
                    <a href="#"><i class="fa-solid fa-eye mr-1"></i></a>
                    <a href="<%= base_url %>dashboard/usuarios/editar/<%= user.user_id %>"><i class="fa-solid fa-pencil mr-1"></i></a>
                    <a href="#"><i class="fa-solid fa-trash"></i></a> 
                </td>
            `;
            tbody_busqueda.appendChild(tr);
        });
       
    } catch (error) {
        console.log(error);
    }
});

