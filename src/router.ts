import { Router, Request, Response } from "express";
import { addProject, getProjects } from "./controller";
const router = Router();
router.get("/",getProjects);  
router.post("/add-projects",addProject);
export default router;