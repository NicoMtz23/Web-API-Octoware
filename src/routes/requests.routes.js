import { Router } from "express";
import { addParamByEndpoint, addResponseByEndpoint, deleteParamByID, deleteResponseByID, getParamsByEndpoint, getResponseByEndpoint, updateParamsByID, updateResponseByID } from "../controllers/requests.controller";

const router = Router()

//GET###############################################################################################################################################################################################
router.get("/param/:id_end", getParamsByEndpoint)

router.get("/response/:id_end", getResponseByEndpoint)


//POST##############################################################################################################################################################################################
router.post("/param/:id_end", addParamByEndpoint)

router.post("/response/:id_end", addResponseByEndpoint)

//PUT###############################################################################################################################################################################################
router.put("/param/:id_param", updateParamsByID)

router.put("/response/:id_respuestas_end", updateResponseByID)

//DELETE############################################################################################################################################################################################
router.delete("/param/:id_param", deleteParamByID)

router.delete("/response/:id_respuestas_end", deleteResponseByID)

export default router
