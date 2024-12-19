import { Router, Request, Response } from "express";
import { addProject, deleteProject, getProjects, getSpecificProject, updateProject } from "./controller";
const router = Router();
router.get("/", getProjects);
router.get("/:id", getSpecificProject);
export default router;