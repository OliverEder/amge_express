const animate_elements = document.querySelectorAll(".animate_element")

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
/* const animated_cards = document.querySelectorAll(".animated_card");

animated_cards.forEach(animated_card =>  {
    console.log(animated_card);
    animated_card.addEventListener("mouseover", (e) => {
        
        const  element = e.target.classList.contains("animated_card") ? e.target : e.target.parentNode;
        const element1 =  element.classList.contains("animated_card") ? element : element.parentNode;
        const element2 =  element1.classList.contains("animated_card") ? element1 : element1.parentNode;
        const element3 =  element2.classList.contains("animated_card") ? element2 : element2.parentNode;
        element3.classList.add("animate__pulse")
    })
})

animated_cards.forEach(animated_card => {
    animated_card.addEventListener("mouseout", (e)=> {
        const  element = e.target.classList.contains("animated_card") ? e.target : e.target.parentNode;
        const element1 =  element.classList.contains("animated_card") ? element : element.parentNode;
        const element2 =  element1.classList.contains("animated_card") ? element1 : element1.parentNode;
        const element3 =  element2.classList.contains("animated_card") ? element2 : element2.parentNode;
        element3.classList.remove("animate__pulse")
    })
}) */