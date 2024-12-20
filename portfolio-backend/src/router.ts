import { Router } from "express";
import { getProjects, getSpecificProject } from "./controller";
const router = Router();
router.get("/", getProjects);
router.get("/:id", getSpecificProject);
export default router;