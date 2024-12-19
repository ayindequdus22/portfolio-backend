import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { client } from "./connectDb";
import logger from "./utils/logger";
import passport from "passport";
import Joi from "joi";
const validateLoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .min(3)
        .max(30)
        .required(),
    password: Joi.string().min(6).max(30)
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})
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
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const { value, error } = validateLoginSchema.validate(req.body);
        if (error) {
            console.log(value, error);
            return res.status(400).json({ error: error.details[0].message });
        }

        passport.authenticate('local', async (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred during authentication.', error: err.message });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            req.logIn(user, async (err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred during login.', error: err.message });
                }
                // await sendLoginEmail(user.email);
                return res.status(200).json({ message: 'Login successful' });
            });
        })(req, res, next);

    } catch (error) {
        console.log(error)
    }
};
const register = async (req: Request, res: Response) => {

};

export { addProject, getProjects, deleteProject, updateProject, login, register, getSpecificProject }