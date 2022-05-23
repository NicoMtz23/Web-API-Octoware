import { config } from "dotenv";
import { Router } from "express";
import { getTableData, getApiDetail, createAPI } from "../controllers/apis.controller";

const router = Router()

router.get("/apis/table", getTableData)

router.get("/apis/:id_api", getApiDetail)

router.post("/apis", createAPI)

export default router