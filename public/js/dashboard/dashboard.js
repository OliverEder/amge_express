const logout_btn = document.querySelector("#logout_btn");

const logout = async (e) => {
    try {
        e.preventDefault();
        const base_url = localStorage.getItem("base_url");
        const user_id = window.localStorage.getItem("user_id");
        
        const form_data = {
            user_id: user_id,         
            sesion_id: window.localStorage.getItem('sesion_id')   
        }

        // Enviar datos de registro
        const response = await fetch(`${base_url}api/user/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams(form_data)
        });
        const result = await response.json();

        localStorage.clear();
        setTimeout(() => {
            window.location.href="/";
        },500);
    } catch (error) {
        console.log(error);
    }
}

logout_btn.addEventListener("click", logout);