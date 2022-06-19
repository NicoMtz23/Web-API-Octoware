import { Router } from "express";
import { addFavByUser, getAllFavsByUser, getSpecificFavByUser, updateFavByUser } from "../controllers/favorites.controller";

const router = Router()

//GET###############################################################################################################################################################################################
router.get("/favorites/", getSpecificFavByUser)

router.get("/favorites/table/", getAllFavsByUser)


//POST##############################################################################################################################################################################################
router.post("/favorites/", addFavByUser)


//PUT###############################################################################################################################################################################################
router.put('/favorites/', updateFavByUser)


//DELETE############################################################################################################################################################################################


export default router