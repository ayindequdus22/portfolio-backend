import express, { Router } from "express";
import { addProject, deleteProject, getUser, login, updateProject } from "./adminController";

// import { client } from "./utils/connectDb.ts";
export const admin = express.Router();
export const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  next();
}
admin.get("/", getUser);
admin.post("/login", login);


admin.post("/add-project",addProject);

admin.delete("/delete-project", deleteProject);
admin.patch("/update-project/:id", updateProject);
export default admin;
