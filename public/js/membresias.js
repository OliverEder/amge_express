const estudiante_btn = document.querySelector("#estudiante_btn");
const jubilado_btn = document.querySelector("#jubilado_btn");
const socio_btn = document.querySelector("#socio_btn");
const pago_modal = document.querySelector("#pago_modal");
const modal_background_pago = document.querySelector("#modal_background_pago");
const close_pago = document.querySelector("#close_pago");

const animate_elements = document.querySelectorAll(".animated_elements");



const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("animate__fadeIn");
            entry.target.classList.remove("is-invisible");
        }/* else{
            entry.target.classList.remove("animate__fadeIn");
        } */
    });
});

const pago_submit = async (event) => {
    event.preventDefault();
    let cardToken = null;
    try {
      
      // Obtén el token de la tarjeta
      cardToken = await card.cardToken();
    } catch (error) {
   
      // Maneja errores durante la tokenización de la tarjeta
      switch (error.code) {
        case "CL2200":
        case "CL2290":
          alert("Error: " + error.message);
          throw error;
          break;
        case "AI1300":
          console.log("Error: ", error.message);
          break;
        default:
          break;
      }
    }
}

const suscribir = (e) => {
    e.preventDefault();
    if(
        !localStorage.getItem("user_email")
    ){
        console.log("Mebresia Activa");
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Debes iniciar la sesion",
            showConfirmButton: false,
            timer: 1500
        });
        return
    }

    if(
        localStorage.getItem("membership_status") &&
        localStorage.getItem("membership_status") == "A"
    ){
        console.log("Mebresia Activa");
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Mebresia Activa",
            showConfirmButton: false,
            timer: 1500
        });
        return
    }

    console.log(localStorage.getItem("membership_status"));
    
    pago_modal.classList.add("is-active");
    console.log("Membresia inactiva");
    // Para inicializar el SDK de Clip se necesita de la llave pública
    const API_KEY = "Bearer NDQ0ZTkzNDYtYWNkOS00YTk1LWIzYTMtNDIyYTYyMTdiNzZhOjNkZTc0ODdlLTc2OWYtNGEyNy04MDc0LTBlYTExNDcxYmE4Zg=="; // Aquí va el prefijo 'Bearer' seguido de tu API Key
    // Inicializa el SDK de Clip con la API Key proporcionada
    const clip = new ClipSDK(API_KEY);
    const card = clip.element.create("Card", {
        theme: "light",
        locale: "es",
    });
    card.mount("checkout");
    const payment_form = document.querySelector("#payment-form");
    payment_form.addEventListener("submit", pago_submit);
}

const cerrar_modal_pago = (e)=> {
    e.preventDefault();
    pago_modal.classList.remove("is-active");
}

animate_elements.forEach(animate_element => observer.observe(animate_element));
estudiante_btn.addEventListener("click", suscribir);
jubilado_btn.addEventListener("click", suscribir);
socio_btn.addEventListener("click", suscribir);
close_pago.addEventListener("click", cerrar_modal_pago);
modal_background_pago.addEventListener("click", cerrar_modal_pago);