import express from "express";
import session from "express-session";
import cors from "cors";
import {} from "dotenv/config";
//importar la conexión a la basede datos
import db from "./config/db.js";


// Routers para las vistas
import router_delegaciones from "./routes/page/delegaciones.js";
import router_dashboard from "./routes/dashboard/dashboard_routes.js";

const app = express();


//Habilitar Cors
app.use(cors());

app.use(express.urlencoded({extended:true}));      
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    res.locals.loged = req.session.loged;
    next();
});

// Archivos publicos
app.use(express.static("public"));
// motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res, next) => {
    res.render("index", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

app.get("/nosotros", (req, res, next) => {
    res.render("nosotros", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

app.get("/membresias", (req, res, next) => {
    res.render("membresias", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

app.get("/servicios", (req, res, next) => {
    res.render("servicios", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

app.get("/perfil/:user_id", (req, res, next) => {
    res.render("perfil", {
        base_url: process.env.BASE_URL,
        api_base_url: process.env.API_BASE_URL
    });
});

app.use("/delegaciones", router_delegaciones);
app.use("/dashboard", router_dashboard);

//conetar base de datos
db.authenticate()
    .then(() => { console.log("Base de datos conectada") })
    .catch(error => { console.log("aqui", error); });


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Servidor activo en el puerto ${port}`);
    console.log(`Ruta del servidor ${process.env.BASE_URL}`);
})