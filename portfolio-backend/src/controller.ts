import { Request, Response } from "express";
import { client } from "./utils/connectDb";
import logger from "./utils/logger";

const getProjects = async (req: Request, res: Response) => {
    try {
        const result = await client.query("Select id,title,image,lDescription,category from projects");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Projects doesn't exist" });
    }
};

const getSpecificProject = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const result = await client.query("Select * from projects where id = $1", [id]);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error("DBERR", error);
        res.status(500).json({ message: "Projects doesn't exist" });
    }

};


export { getProjects, getSpecificProject }