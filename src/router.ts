import { Router, Request, Response } from "express";
import { addProject, deleteProject, getProjects, updateProject } from "./controller";
const router = Router();
router.get("/",getProjects);  
router.post("/add-project",addProject);
router.delete("/delete-project",deleteProject);
router.patch("/update-project/:id",updateProject)
export default router;