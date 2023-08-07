document.addEventListener("DOMContentLoaded", () => {
    const users_per_delegation = document.querySelector("#users_per_delegation");
    var data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
      }];
      
      var layout = {
        title: "Usuarios por delegaciòn"
      };
      
      Plotly.newPlot(users_per_delegation, data, layout);
});