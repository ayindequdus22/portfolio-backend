import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { client } from "./connectDb";
import logger from "./utils/logger";

const getProjects = async (req: Request, res: Response) => {
    try {
        const result = await client.query("Select id,title,image,lDescription from projects");
        res.status(200).json(result.rows,);
    } catch (error) {
        logger.error("DBERR", error);
        res.status(500).json({ message: "Projects doesn't exist" });
    }
};

const getSpecificProject = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const result = await client.query("Select * from projects where id = $1", [id]);
        res.status(200).json(result.rows);

    } catch (error) {
        logger.error("DBERR", error);
        res.status(500).json({ message: "Projects doesn't exist" });
    }

};

const addProject = async (req: Request, res: Response) => {
    const { image, details, title, link, video } = req.body;
    if (!image || !video) {
        res.status(400).json({ message: "Image and video must be sent" })
    }
    try {

        const uploadedImg = await cloudinary.uploader
            .upload(image);
        const uploadedVideo = await cloudinary.uploader
            .upload(video);
        const value = [uploadedImg.url, details, title, link, uploadedVideo.url];

        const projectExists = await client.query(`Select id from projects WHERE id = $1`, [link]);
        if (projectExists.rows.length) {
            res.status(400).json("Project exists");
        }
        await client.query(`Insert into projects(name,title,image,video,lDescription,bDescription) values  ($1, $2, $3, $4, $5, $6)
`, value);
        res.status(201).json("Project has been added");
    } catch (error) {
        logger.error("Error adding project:", error);
        res.status(500).json({ message: "Unable to add project at this time" });
    }
};

const deleteProject = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await client.query("delete from projects where id = $1", [id]);
        res.status(200).json(`${id} has been deleted`);

    } catch (error) {
        logger.error("Error deleting project", error);
        res.status(500).json({ message: "Error deleting project" });
    }
};

const updateProject = async (req: Request, res: Response) => {

};
const login = async (req: Request, res: Response) => {

};
const register = async (req: Request, res: Response) => {

};

export { addProject, getProjects, deleteProject, updateProject, login, register, getSpecificProject }