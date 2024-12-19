import express,{ Router } from "express";
import { addProject, deleteProject, login, register, updateProject } from "./controller";

const admin:Router = express.Router();
admin.post("/login",login);
admin.post("/register",register);
admin.post("/add-project",addProject);
admin.delete("/delete-project",deleteProject);
admin.patch("/update-project/:id",updateProject);
export default admin;