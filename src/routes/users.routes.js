import { Router } from "express";
import { createUser, deleteUserById, getUsers, updateRoleById, getUserByEmail} from "../controllers/users.controller"

const router = Router()

router.get("/users", getUsers)

router.post("/users", createUser)

router.delete("/users/:id_usr", deleteUserById)

router.put("/users/:id_usr", updateRoleById)

router.get("/users/email/", getUserByEmail)

export default router