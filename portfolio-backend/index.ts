import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from "cors";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import "dotenv/config";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import connectDb, { client } from './src/utils/connectDb';
import adminRouter from "./src/admin";
import projectRouter from "./src/router"
import strategy from "./src/strategy";
// Initialize the Express app
const app: Application = express();

// Middlewares

app.use(express.json({ limit: "200mb", })); //parse req body to js object
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
const allowedOrigins: string[] = (process.env.ALLOWED_ORIGINS || "").split(",").map(origin => origin.trim().replace(/\/$/, "")).filter(origin => origin !== "");
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
const pgSession = connectPgSimple(session);

app.use(cookieParser());
app.use(session({
  secret: `${process.env.secret}`,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,   
    secure: true,   
    sameSite: 'strict' 
  },  
  store: new pgSession({ pool: client })
}));

app.use(strategy.initialize());
app.use(strategy.session());

// // to prevent attackers from knowing the type of technology user
app.disable('x-powered-by');
// req.protocol  req.secure
// app.use((req, res, next) => {
//   // Check if the protocol is not HTTPS
//   if (req.protocol !== "https") {
//     // Redirect to HTTPS version of the same URL
//     return res.redirect(301, `https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

// custom error handler
app.use((err:any, req, res, next) => {
  console.log(err)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/admin", adminRouter);
// custom 404 i.e for routes that do not exist
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});


// Start the server


const startServer = async () => {
  try {
    await connectDb(); // Ensure DB is connected before starting server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }

}

startServer();