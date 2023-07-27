export const delegaciones = (req, res, next) => {
    res.render("delegaciones", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
}

export const delegacion = (req, res, next) => {
    const { params } = req;

    const delegaciones = [
        {
            id: 1,
            nombre: "Directiva Nacional",
            directiva: [
                {
                    nombre: "Humberto Salazar Soto",
                    cargo: "Presidente AMGE Nacional",
                    image: "images/delegaciones/directiva_nacional/humberto_salasar.webp"
                },
                {
                    nombre: "Claudia Alicia Beristain Suárez",
                    cargo: "Vicepresidente AMGE NacionaL",
                    image: "images/delegaciones/directiva_nacional/amge_log.webp"
                },
                {
                    nombre: "José Gerardo López Leyva",
                    cargo: "Secretario AMGE Nacional",
                    image: "images/delegaciones/directiva_nacional/amge_log.webp"
                },
                {
                    nombre: "Juan Manuel Nájera García",
                    cargo: "Tesorero AMGE Nacional",
                    image: "images/delegaciones/directiva_nacional/juan_manuel_najera.webp"
                },                
            ]
        },
        {
            id: 2,
            nombre: "Delegación Villahermosa",
            directiva: [
                {
                    nombre: "Guadalupe Torres Acuña",
                    cargo: "Presidenta",
                    image: "images/delegaciones/villahermosa/guadalupe_torres.webp"
                },
                {
                    nombre: "Claudia Alicia Beristain Suárez",
                    cargo: "Vicepresidente",
                    image: "images/delegaciones/villahermosa/humberto_arevalo.webp"
                },
                {
                    nombre: "",
                    cargo: "Tesorero",
                    image: "images/delegaciones/villahermosa/tesorero.webp"
                },
                {
                    nombre: "",
                    cargo: "Secretario",
                    image: "images/delegaciones/directiva_nacional/amge_log.webp"
                },                
            ]
        },
        {
            id: 3,
            nombre: "Delegación CDMX",
            directiva: [
                {
                    nombre: "Fco. Rubén Rocha de la Vega",
                    cargo: "Presidente",
                    image: "images/delegaciones/cdmx/fco_rocha.webp"
                },
                {
                    nombre: "Raúl del Valle García",
                    cargo: "secretario",
                    image: "images/delegaciones/cdmx/raul_delvalle.webp"
                }               
            ]
        },
        {
            id: 4,
            nombre: "Delegación Tampico",
            directiva: [
                {
                    nombre: "José C. Cámara Alfaro",
                    cargo: "Presidente",
                    image: "images/delegaciones/tampico/jose_camara.webp"
                },
                {
                    nombre: "José Trinidad Martínez Vázquez",
                    cargo: "Vicepresidente",
                    image: "images/delegaciones/tampico/jose_martinez.webp"
                },
                {
                    nombre: "Antonio Hernández Patiño",
                    cargo: "Secretario",
                    image: "images/delegaciones/tampico/antonio_hernandez.webp"
                },
                {
                    nombre: "Alfredo Fausto Treviño Rodríguez",
                    cargo: "Tesorerol",
                    image: "images/delegaciones/tampico/alfredo_trevino.webp"
                },                
            ]
        }
    ];

    const delegacion = delegaciones.filter(delegacion => delegacion.id == params.delegacion_id);
    console.log(delegacion);
    res.render("delegacion", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL,
        delegacion: delegacion[0]
    });
}