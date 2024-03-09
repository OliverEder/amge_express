
const btn_desplegable = document.querySelectorAll(".btn_desplegable");
const year_desplegable = document.querySelectorAll(".year_desplegable");

const pdf_buttons = document.querySelectorAll(".view-pdf");
const pdf_view = document.querySelector("#pdf-view");
const main_pdf = document.querySelector("#main-pdf");
const loader_spinner = document.querySelector("#loader-spinner");

pdf_buttons.forEach(function(button){
    button.addEventListener("click",view_pdf);            
});

function view_pdf(){
    let pdf_button_parent = event.target.parentNode;
    let pdf = pdf_button_parent.lastElementChild;
    let pdf_src = pdf.getAttribute("src");
    main_pdf.setAttribute("src",pdf_src);
    pdf_view.classList.add("is-hidden"),
    loader_spinner.classList.remove("is-hidden");
    setTimeout(function(){
        loader_spinner.classList.add("is-hidden");
        main_pdf.classList.remove("is-hidden");                
    },1000);
}

const activa_folder = (e)=>{
    try {
        e.preventDefault();
        let target = e.target.parentElement.parentElement.parentElement.classList.contains("btn_desplegable") ? e.target.parentElement.parentElement.parentElement :e.target.parentElement;
        let year = target.getAttribute("year");
        let boletines = document.querySelector(`#boletines_${year}`);
        
        if (boletines.classList.length  === 2) {
            boletines.classList.remove("is-hidden");
        } else {
            boletines.classList.add("is-hidden");
        }
    } catch (error) {
        console.log(error);
    }
}

const activ_year = (e)=>{
    try {
        e.preventDefault();
        let target = e.target.parentElement.parentElement.parentElement.classList.contains("year_desplegable") ? e.target.parentElement.parentElement.parentElement :e.target.parentElement;
        let year = target.getAttribute("year");
        let boletines = document.querySelector(`#boletines_${year}`);
        
        if (boletines.classList.length  === 2) {
            boletines.classList.remove("is-hidden");
        } else {
            boletines.classList.add("is-hidden");
        }
    } catch (error) {
        console.log(error);
    }
}

btn_desplegable.forEach(btn =>{
    btn.addEventListener("click", activa_folder);
});
year_desplegable.forEach(btn =>{
    btn.addEventListener("click", activ_year);
});