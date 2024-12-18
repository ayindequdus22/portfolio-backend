import { Router, Request, Response } from "express";
import { addProject, deleteProject, getProjects } from "./controller";
const router = Router();
router.get("/",getProjects);  
router.post("/add-project",addProject);
router.delete("/delete-project",deleteProject);
export default router;