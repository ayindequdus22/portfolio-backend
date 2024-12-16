import express, { Request, Response } from 'express';
import "dotenv/config";
import connectDb from './connectDb';

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // to prevent attackers from knowing the type of technology user
app.disable('x-powered-by');


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
const router = express.Router();
router.get("/projects", async (req: Request, res: Response) => {
  res.json("Hello");
});

app.use("/v1", router);
// Start the server
app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});



