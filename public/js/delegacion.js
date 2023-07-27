const animate_elements = document.querySelectorAll(".animate_directive");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("animate__fadeIn");
            entry.target.classList.remove("is-invisible");
        }/* else{
            entry.target.classList.remove("animate__fadeInLeft");
        } */
    });
},
{threshold:0.5}
);

animate_elements.forEach(animate_element => observer.observe(animate_element));

