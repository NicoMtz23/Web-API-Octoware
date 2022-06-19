import { Router } from "express";
import { addCategoriesByAPI, deleteCategoryByID, getAllCategories, getCategoriesByAPI, updateCategoryByID } from "../controllers/categories.controller";

const router = Router()

//GET###############################################################################################################################################################################################
router.get("/categories/", getAllCategories)

router.get("/categories/:id_api", getCategoriesByAPI)


//POST##############################################################################################################################################################################################
router.post("/categories/:id_api", addCategoriesByAPI )


//PUT###############################################################################################################################################################################################
router.put("/categories/:id_cat", updateCategoryByID)


//DELETE############################################################################################################################################################################################
router.delete("/categories/:id_cat", deleteCategoryByID)


export default router
