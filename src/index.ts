import express, { Application, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";
import connectDb from './connectDb';
import router from './router';

// Initialize the Express app
const app:Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
// // to prevent attackers from knowing the type of technology user
app.disable('x-powered-by');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


app.use("/v1/projects", router);
// custom 404 i.e for routes that do not exist
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});



// Start the server
app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});



