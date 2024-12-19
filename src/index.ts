import express, { Application, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import cors, { CorsOptions } from "cors";
import helmet from 'helmet';
import "dotenv/config";
import connectDb from './connectDb';
import logger from './utils/logger';
import adminRouter from "./admin";
import projectRouter from "./router"
import strategy from "./strategy"
// Initialize the Express app
const app: Application = express();

// Middlewares

app.use(express.json({limit:"200kb",})); //parse req body to js object
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
const allowedOrigins: string[] = (process.env.ALLOWED_ORIGINS || "").split(",").map(origin => origin.trim().replace(/\/$/, "")).filter(origin => origin !== "");
console.log(allowedOrigins)
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // (origin.startsWith('https://') && //likkle 
      // allow the req
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,POST,DELETE',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(strategy.initialize());
app.use(strategy.session());
// cors

// // to prevent attackers from knowing the type of technology user
app.disable('x-powered-by');
// req.protocol  req.secure


console.log(process.env.NODE_ENV);
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


app.use("/v1/projects",projectRouter);
app.use("/v1/admin",adminRouter);
// custom 404 i.e for routes that do not exist
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).send('Something broke!')
})

// Start the server
app.listen(process.env.PORT, () => {
  connectDb();
  logger.debug(`Server is running on http://localhost:${process.env.PORT}`);
});



