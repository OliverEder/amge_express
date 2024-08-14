const enviar_btn = document.querySelector("#enviar_btn");

const enviar = async (e) => {
    e.preventDefault();
    const votacion = document.querySelector("#votacion");
    const question_divs = document.querySelectorAll(".question_div");
    const questions = [];

    question_divs.forEach(question_div => {
        const question = {
            question_id: "",
            option: ""
        };
        question.question_id = question_div.getAttribute("question");
        const option_divs = question_div.querySelectorAll(".option_div");
        option_divs.forEach(option_div => {
            const option = option_div.querySelector(".opcion");
            if(option.checked){
                question.option = option.value;
            }
            
        });
        questions.push(question)
        
    });

    const questions_emty = questions.filter(question => {
        if(question.option == ""){
            return question;
        }
    });

    console.log("questions_emty:", questions_emty);

    if(questions_emty.length != 0){
        Swal.fire({
            title: "Registro",
            text: "Es necesario seleccionar una opcion de cada pregunta",
            icon: "warning",
            showConfirmButton: true
        })
        return;
    }
    
    const data = {
        vote_id: votacion.getAttribute("votacion_id"),
        questions: JSON.stringify(questions),
        user_id: localStorage.getItem("user_id")
    }

    console.log(data);
    
    // Enviar datos de registro
    const base_url = localStorage.getItem("base_url");
    const response = await fetch(`${base_url}api/vote/answer`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(data)
    });

    const result = await response.json();
    console.log("result:", result);
    if(!result.error){
        Swal.fire({
            title: "Registro",
            text: "Voto guardado correctamente",
            icon: "success",
            showConfirmButton: true
        }).then(() => {
            window.location.href="/";
        })
    }

} 
enviar_btn.addEventListener("click", enviar);