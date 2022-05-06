import { Router } from "express";
import { getTableData, getApiDetail } from "../controllers/apis.controller";

const router = Router()

router.get("/apis/table", getTableData)

router.get("/apis/:id_api", getApiDetail)

export default router