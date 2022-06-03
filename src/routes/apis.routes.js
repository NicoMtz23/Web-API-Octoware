import { config } from "dotenv";
import { Router } from "express";
import { getTableData, getApiDetail, createAPI, getCategories, getCategoriesByID, getEndpointsByCat, getSpecificEndpointByID, getParamsByID, getResponseByID, addCategoriesByID, deleteAPIByID, updateGeneralAPI, updateCategoryName, deleteCategoryByID, addMethodByCat, deleteMethodByID, updateMethod } from "../controllers/apis.controller";

const router = Router()

//GET----------------------------------------------------------
router.get("/apis/table", getTableData)

router.get("/apis/:id_api", getApiDetail)

router.get("/categories", getCategories)

router.get("/categories/:id_api", getCategoriesByID)

router.get("/endpoints", getEndpointsByCat)

router.get("/endpoints/:id_end", getSpecificEndpointByID)

router.get("/query/:id_end", getParamsByID)

router.get("/response/:id_end", getResponseByID)


//POST----------------------------------------------------------
router.post("/apis", createAPI)

router.post("/categories/:id_api", addCategoriesByID )

router.post("/endpoints/:id_cat", addMethodByCat)


//DELETE----------------------------------------------------------
router.delete("/apis/:id_api", deleteAPIByID)

router.delete("/categories/:id_cat", deleteCategoryByID)

router.delete("/endpoints/:id_end", deleteMethodByID)

//PUT----------------------------------------------------------
router.put("/apis/:id_api", updateGeneralAPI)

router.put("/categories/:id_cat", updateCategoryName)

router.put("/endpoints/:id_end", updateMethod)


export default router