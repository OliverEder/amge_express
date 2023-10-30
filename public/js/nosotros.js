const sections = document.querySelectorAll(".section");
const menu_nosotros_btn = document.querySelector("#menu_nosotros_btn");
const menu_li = document.querySelectorAll(".menu_li");
console.log(sections);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("animate__fadeIn");
            entry.target.classList.remove("is-invisible");
            console.log(entry.target.id);
            menu_li.forEach(li => {
                li.classList.remove("is-active");
                if(li.getAttribute("target")=== entry.target.id ){
                    console.log("encontrado");
                    li.classList.add("is-active")
                }
            });

        }/* else{
            entry.target.classList.remove("animate__fadeIn");
        } */
    });
},
{threshold:0.5}
);

sections.forEach(section => observer.observe(section));
menu_nosotros_btn.addEventListener("click", ()=>{
    const menu_nosotros = document.querySelector("#menu_nosotros");
    const menu_nosotros_contenido = document.querySelector("#menu_nosotros_contenido");
    menu_nosotros.classList.toggle("colapsed");
    menu_nosotros_contenido.classList.toggle("colapsed");
});

menu_li.forEach(li => {
    li.addEventListener("click", (e) => {
        e.preventDefault();
        const target_id = e.target.getAttribute("target")
        const target = document.querySelector(`#${target_id}`);
        console.log(target);
        target.scrollIntoView({ behavior: 'smooth'});

    })
});

var accordions = bulmaAccordion.attach(); 