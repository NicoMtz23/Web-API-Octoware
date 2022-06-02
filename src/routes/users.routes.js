import { Router } from "express";
import { createUser, deleteUserById, getUsers, updateRoleById, getUserByEmail, generateGoogleToken, generateMSToken, postFavByIDs, getFavByIDs, putFavByIDs, getAllFavoritesByUserID} from "../controllers/users.controller"

const router = Router()

router.get("/users", getUsers)

router.post("/users", createUser)

router.delete("/users/:id_usr", deleteUserById)

router.put("/users/:id_usr", updateRoleById)

router.get("/users/email/", getUserByEmail)

router.post("/users/auth/google", generateGoogleToken)

router.post("/users/auth/ms", generateMSToken)

router.get("/favDisp", getFavByIDs)

router.post("/favDisp", postFavByIDs)

router.put("/favDisp", putFavByIDs)

router.get("/tablefavs", getAllFavoritesByUserID)

export default router