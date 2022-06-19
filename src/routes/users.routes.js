import { Router } from "express";
import { addNewUser, deleteUserByID, generateGoogleToken, generateMSToken, getAllUsers, getUserByEmail, logicActivationUserByID, logicDeleteUserByID, updateRoleByID } from "../controllers/users.controller";

const router = Router()

//GET###############################################################################################################################################################################################
router.get("/users/", getAllUsers)

router.get("/users/email/", getUserByEmail)
 

//POST##############################################################################################################################################################################################
router.post("/users/", addNewUser)


//PUT###############################################################################################################################################################################################
router.put("/users/:id_usr", updateRoleByID)

router.put("/users/status/:id_usr", logicDeleteUserByID)

router.put("/users/active/:id_usr", logicActivationUserByID)


//DELETE############################################################################################################################################################################################
router.delete("/users/:id_usr", deleteUserByID)


//AUTH##############################################################################################################################################################################################
router.post("/users/auth/google", generateGoogleToken)

router.post("/users/auth/ms", generateMSToken)


export default router