import { Router } from "express";
import { createUser, LogicDeleteUserById, deleteUserById, getUsers, updateRoleById, getUserByEmail, generateGoogleToken, generateMSToken, getFavByIDs, postFav, putFav, getAllFavoritesByUserID} from "../controllers/users.controller"

const router = Router()

router.get("/users", getUsers)

router.post("/users", createUser)

router.put("/users/:id_usr", updateRoleById)

router.put("/users/estatus/:id_usr", LogicDeleteUserById)

router.delete("/users/:id_usr", deleteUserById)

router.get("/users/email/", getUserByEmail)

router.post("/users/auth/google", generateGoogleToken)

router.post("/users/auth/ms", generateMSToken)

router.get("/favDisp/", getFavByIDs)

router.post("/favDisp/", postFav)

router.put('/favDisp/', putFav)

router.get("/tablefavs/", getAllFavoritesByUserID)

export default router