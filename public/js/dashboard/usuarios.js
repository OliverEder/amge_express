const buscar_input = document.querySelector("#buscar_input");
const tbody_paginada = document.querySelector("#tbody_paginada");
const tbody_busqueda = document.querySelector("#tbody_busqueda");
const tbody_sessions = document.querySelector("#tbody_sessions");

let currentPage = 1;
let totalPages = 1;

document.addEventListener("DOMContentLoaded", () => {
    build_active_users_chart();
    memberships_chart();
    build_sessions_record_chart();
    paginate_sessions_table();
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

const build_sessions_record_chart = async () => {

    try {
        const base_url = localStorage.getItem("base_url");
        const response = await fetch(`${base_url}api/session/stats`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        });

        const result = await response.json();

        const sessions_record_chart = document.querySelector("#sessions_record_chart");
        var data = [
            {
                x: result.map(item => item.date), // Fechas
                y: result.map(item => item.count), // Conteos
                type: 'scatter'
            }
        ];

        var layout = {
            title: 'Registro historico de sesiones',
        };
        
        Plotly.newPlot(sessions_record_chart, data, layout);
    } catch (error) {
        console.log(error);
        
    }
}

const paginate_sessions_table =  async (page = 1, limit = 5) => {
    try {
        console.log("page:", page, "limit", limit);
        
        // Enviar datos de registro
        const base_url = localStorage.getItem("base_url");
        const response = await fetch(`${base_url}api/session?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        });

        const result = await response.json();
        const {data, pagination} = result;
        
        // Actualizar variables globales
        currentPage = pagination.currentPage;
        totalPages = pagination.totalPages;

        // Limpiar la tabla antes de agregar nuevos datos
        tbody_sessions.innerHTML = "";

        data.forEach((session, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${session.sesion_id}</td>
                <td>${session.user.user_email}</td>
                <td>${session.sesion_in}</td>
                <td>${session.sesion_out ? session.sesion_out : ""}</td>
                <td>
                    <a href="#"><i class="fa-solid fa-eye mr-1"></i></a>
                </td>
            `;
            tbody_sessions.appendChild(tr);
        });
        
        // Actualizar los controles de paginación
        updatePaginationControls();
                
    } catch (error) {
        console.log(error);
        
    }
}

const updatePaginationControls = () => {
    console.log("updatePaginationControls::::");
    
    const paginationList = document.querySelector('.session_pagination-list');
    paginationList.innerHTML = "";
    console.log("paginationList::", paginationList);
    
    // Botón "Anterior"
    const previousButton = document.querySelector('.session_pagination-previous');
    previousButton.disabled = currentPage === 1;
    previousButton.onclick = () => {
        if (currentPage > 1) {
            paginate_sessions_table(currentPage - 1);
        }
    };

    // Botón "Siguiente"
    const nextButton = document.querySelector('.session_pagination-next');
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            paginate_sessions_table(currentPage + 1);
        }
    };

    // Generar números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        const pageLink = document.createElement('a');
        pageLink.className = 'pagination-link';
        if (i === currentPage) {
            pageLink.classList.add('is-current');
            pageLink.setAttribute('aria-current', 'page');
        }
        pageLink.textContent = i;
        pageLink.onclick = () => paginate_sessions_table(i);

        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
    }
};



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
                    <a href="${base_url}dashboard/usuarios/editar/${user.user_id}"><i class="fa-solid fa-pencil mr-1"></i></a>
                    <a href="#"><i class="fa-solid fa-trash"></i></a> 
                </td>
            `;
            tbody_busqueda.appendChild(tr);
        });
       
    } catch (error) {
        console.log(error);
    }
});



