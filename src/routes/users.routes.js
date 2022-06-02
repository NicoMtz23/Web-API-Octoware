import { Router } from "express";
import { createUser, deleteUserById, getUsers, updateRoleById, getUserByEmail, generateGoogleToken, generateMSToken, getFav, postFav, putFav} from "../controllers/users.controller"

const router = Router()

router.get("/users", getUsers)

router.post("/users", createUser)

router.delete("/users/:id_usr", deleteUserById)

router.put("/users/:id_usr", updateRoleById)

router.get("/users/email/", getUserByEmail)

router.post("/users/auth/google", generateGoogleToken)

router.post("/users/auth/ms", generateMSToken)

router.get("/users/favorites/", getFav)

router.post("/users/favorites/", postFav)

export default router