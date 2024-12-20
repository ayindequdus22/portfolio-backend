import express,{ Router } from "express";
import { addProject, deleteProject, login, updateProject } from "./adminController";

const admin:Router = express.Router();
admin.post("/login",login);
admin.post("/add-project",addProject);
admin.delete("/delete-project",deleteProject);
admin.patch("/update-project/:id",updateProject);
export default admin;