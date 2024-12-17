import { Request, Response } from "express";
import { client } from "./connectDb";

const addProject = async (req: Request, res: Response) => {
    const { image, details, title, link, video } = req.body;
    const value = [image, details, title, link, video];
    try {
        const projectExists = await client.query(`Select link from projects WHERE link = $1`, [link]);
        if (projectExists.rows.length) {
            res.status(400).json("Project exists");
        }
        await client.query(`INSERT INTO projects (image, details, title, link, video) 
    VALUES ($1, $2, $3, $4, $5)
`, value);
        res.status(201).json("Project has been added");
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Unable to add project at this time" });
    }
};
const getProjects = async (req: Request, res: Response) => {
    try {
        const result = await client.query("Select * from projects");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("DBERR", error);
        res.status(500).json({ message: "Projects doesn't exist" });
    }
};
const deleteProject = async (req: Request, res: Response) => {

}

export { addProject, getProjects, deleteProject }