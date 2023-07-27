const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("animate__fadeIn");
            entry.target.classList.remove("is-invisible");
        }/* else{
            entry.target.classList.remove("animate__fadeIn");
        } */
    });
},
{threshold:0.5}
);

sections.forEach(section => observer.observe(section));
