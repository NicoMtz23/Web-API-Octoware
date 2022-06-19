import express from "express";
import config from "./config";
import cors from "cors";
import morgan from "morgan";

import apisRoutes from "./routes/apis.routes"
import categoriesRoutes from "./routes/categories.routes"
import endpointsRoutes from "./routes/endpoints.routes"
import favoritesRoutes from "./routes/favorites.routes"
import requestsRoutes from "./routes/requests.routes"
import usersRoutes from "./routes/users.routes"

const app = express()

//Configuracion
app.set('port', config.port)

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use(usersRoutes, apisRoutes, categoriesRoutes, endpointsRoutes, favoritesRoutes, requestsRoutes)

export default app