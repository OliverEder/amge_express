import express from "express";
import session from "express-session";
import cors from "cors";
import {} from "dotenv/config";
//importar la conexión a la basede datos
import db from "./config/db.js";


// Routers para las vistas
import router_delegaciones from "./routes/page/delegaciones.js";
import router_dashboard from "./routes/dashboard/dashboard_routes.js";
import router_amge from "./routes/page/amge_routes.js";
import router_api_user from "./routes/api/api_user_routes.js";
import router_api_new from "./routes/api/api_new_routes.js";
const app = express();

//Habilitar Cors
app.use(cors());

app.use(express.urlencoded({extended:true}));      
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        expires: new Date(Date.now() + (24 * 60 * 60 * 1000) ),
        //maxAge: (24 * 60 * 60 * 1000) 
    }
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


app.use("/delegaciones", router_delegaciones);
app.use("/dashboard", router_dashboard);
app.use("/api/user", router_api_user);
app.use("/api/new", router_api_new);
app.use("/", router_amge);

//conetar base de datos
db.authenticate()
    .then(() => { console.log("Base de datos conectada") })
    .catch(error => { console.log("aqui", error); });


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Servidor activo en el puerto ${port}`);
    console.log(`Ruta del servidor ${process.env.BASE_URL}`);
})