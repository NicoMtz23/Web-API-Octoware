import express from "express";
import config from "./config";
import cors from "cors";
import morgan from "morgan";

import usersRoutes from "./routes/users.routes"
import apisRoutes from "./routes/apis.routes"

const app = express()

//Configuracion
app.set('port', config.port)

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use(usersRoutes, apisRoutes)

export default app