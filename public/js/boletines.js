
const btn_desplegable = document.querySelectorAll(".btn_desplegable");
const year_desplegable = document.querySelectorAll(".year_desplegable");


const activa_folder = (e)=>{
    try {
        e.preventDefault();
        let target = e.target.parentElement.parentElement.parentElement.classList.contains("btn_desplegable") ? e.target.parentElement.parentElement.parentElement :e.target.parentElement;
        let year = target.getAttribute("year");
        let boletines = document.querySelector(`#boletines_${year}`);
        //console.log(boletines.classList.length,"Bolet");
        if (boletines.classList.length  === 2) {
            boletines.classList.remove("is-hidden");
        } else {
            boletines.classList.add("is-hidden");
        }
        console.log(target.getAttribute("year"));
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
        //console.log(boletines.classList.length,"Bolet");
        if (boletines.classList.length  === 2) {
            boletines.classList.remove("is-hidden");
        } else {
            boletines.classList.add("is-hidden");
        }
        console.log(target.getAttribute("year"));
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