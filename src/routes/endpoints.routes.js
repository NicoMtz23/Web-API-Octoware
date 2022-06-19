import { Router } from "express";
import { addMethodByCat, deleteMethodByID, getAllEndpoints, getEndpointByID, updateMethodByID } from "../controllers/endpoints.controller";

const router = Router()

//GET###############################################################################################################################################################################################
router.get("/endpoints/", getAllEndpoints)

router.get("/endpoints/:id_end", getEndpointByID)


//POST##############################################################################################################################################################################################
router.post("/endpoints/:id_cat", addMethodByCat)


//PUT###############################################################################################################################################################################################
router.put("/endpoints/:id_end", updateMethodByID)


//DELETE############################################################################################################################################################################################
router.delete("/endpoints/:id_end", deleteMethodByID)


export default router