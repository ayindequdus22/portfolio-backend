import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { client } from "./utils/connectDb";
import logger from "./utils/logger";
import passport from "passport";
import Joi from "joi";
const validateLoginSchema = Joi.object({
    username: Joi.string().max(6).min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .min(3)
        .max(30)
        .required(),
    role: Joi.string().max(5).min(5).required(),
    password: Joi.string().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const addProject = async (req: Request, res: Response) => {
    const { image, details, title, link, video, category } = req.body;
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
        await client.query(`Insert into projects(name,title,image,video,lDescription,bDescription,category) values  ($1, $2, $3, $4, $5, $6,$7)
`, value);
        res.status(201).json("Project has been added");
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Unable to add project at this time" });
    }
};

const deleteProject = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await client.query("delete from projects where id = $1", [id]);
        res.status(200).json(`${id} has been deleted`);

    } catch (error) {
        console.error("Error deleting project", error);
        res.status(500).json({ message: "Error deleting project" });
    }
};

const updateProject = async (req: Request, res: Response) => {

};
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if email, password, username, or role is missing
        if (!email || !password || !username || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Validate request body
        const { value, error } = validateLoginSchema.validate(req.body);
        if (error) {
            console.info(value, error);
            return res.status(400).json({ error: error.details[0].message });
        }

        // Authenticate user
        passport.authenticate('local', async (err, user, info) => {
            if (err) {
                console.error('Authentication error:', err);
                return res.status(500).json({ message: 'An error occurred during authentication.', error: err.message });
            }

            if (!user) {
                // If no user is found, respond with the error message from Passport
                return res.status(400).json({ message: info?.message || 'Authentication failed.' });
            }

            // Log in the user
            req.logIn(user, async (err) => {
                if (err) {
                    console.error('Login error:', err);
                    return res.status(500).json({ message: 'An error occurred during login.', error: err.message });
                }

                // Successful login
                return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
            });
        })(req, res, next);

    } catch (error) {
        console.error('Unexpected error in login:', error);
        return res.status(500).json({ message: 'An unexpected error occurred.', error: error.message });
    }
};

export { login, updateProject, deleteProject, addProject }