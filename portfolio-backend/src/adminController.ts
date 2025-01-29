import { NextFunction, Request, Response } from "express";
import { client } from "./utils/connectDb";
import passport from "passport";
import Joi from "joi";
const validateLoginSchema = Joi.object({
    username: Joi.string().max(6).min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .min(3)
        .max(30)
        .required(),
    role: Joi.string().max(5).min(5).required(),
    password: Joi.string().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9-]{3,30}$')),
});


const addProject = async (req: Request, res: Response) => {
    try {
        const { lDescription, bDescription, title, link, category, image, video } = req.body;
        if (!lDescription || !bDescription || !title || !link || !category || !image || !video) {
            return res.status(400).json({ message: "One field is missing" });
        }

        const projectExists = await client.query(
            `SELECT link FROM projects WHERE link = $1`,
            [link]
        );
        if (projectExists.rows.length) {
            return res.status(400).json("Project exists");
        }
        const value = [title, image, video, lDescription, bDescription, category, link];

        await client.query(
            `INSERT INTO projects (title, image, video, lDescription, bDescription, category, link) 
   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            value
        );
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
const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        const user = await client.query("Select username, email, id from users where id=$1", [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user.rows);
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
}
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

            return res.status(400).json({ error: error.details[0].message });
        }

        // Authenticate user
        passport.authenticate('local', async (err, user, info) => {
            if (err) {
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

export { login, updateProject, deleteProject, addProject, getUser }