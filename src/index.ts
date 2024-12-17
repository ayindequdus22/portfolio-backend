import express, { Request, Response } from 'express';
import "dotenv/config";
import connectDb from './connectDb';
import router from './router';

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // to prevent attackers from knowing the type of technology user
app.disable('x-powered-by');

// body-parser
// app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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



