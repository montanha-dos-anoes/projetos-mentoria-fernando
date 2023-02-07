import { Router } from "express";
import { firstController } from "../controller/first.controller";

const router: Router = Router()
router.get("/", firstController.home);
export { router };