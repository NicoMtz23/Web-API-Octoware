import { Router } from "express";
import { addNewAPI, deleteAPIByID, getApiCount, getApiDetailByID, getCatalogueData, getMethodCount, getRandomAPI, updateAPIByID, updateDispByID } from "../controllers/apis.controller";

const router = Router()

//GET###############################################################################################################################################################################################
router.get("/apis/table", getCatalogueData)

router.get("/apis/:id_api", getApiDetailByID)

router.get("/dashboard/api/", getApiCount)

router.get("/dashboard/method/", getMethodCount)

router.get("/dashboard/rand", getRandomAPI)

//POST##############################################################################################################################################################################################
router.post("/apis/", addNewAPI)


//PUT###############################################################################################################################################################################################
router.put("/apis/:id_api", updateAPIByID)

router.put("/apis/disp/:id_api", updateDispByID)


//DELETE############################################################################################################################################################################################
router.delete("/apis/:id_api", deleteAPIByID)


export default router