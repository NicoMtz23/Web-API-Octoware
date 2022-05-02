import { Router } from "express";
import { getTableData } from "../controllers/apis.controller";

const router = Router()

router.get("/apis/table", getTableData)

export default router