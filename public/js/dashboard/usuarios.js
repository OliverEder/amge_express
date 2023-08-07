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