import { config } from "dotenv";
import { Router } from "express";
import { getTableData, getApiDetail, createAPI, getCategories, getCategoriesByID, getEndpointsByCat, getSpecificEndpointByID, getParamsByID, getResponseByID, addCategoriesByID } from "../controllers/apis.controller";

const router = Router()

router.get("/apis/table", getTableData)

router.get("/apis/:id_api", getApiDetail)

router.post("/apis", createAPI)

router.get("/categories", getCategories)

router.get("/categories/:id_api", getCategoriesByID)

router.get("/endpoints", getEndpointsByCat)

router.get("/endpoints/:id_end", getSpecificEndpointByID)

router.get("/query/:id_end", getParamsByID)

router.get("/response/:id_end", getResponseByID)

router.post("/categories/:id_api", addCategoriesByID )

export default router