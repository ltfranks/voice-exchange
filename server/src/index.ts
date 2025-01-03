import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';  // need the file extension ".js" here even for ts

dotenv.config();
const app = express();

// http://localhost:8080/hello to test
app.get("/hello", (_: Request, res: Response) => {
    res.send(
        `<h1>Hello!</h1>
         <p>Server is up and running.</p>
        `
    );
});

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Use the chat routes
app.use('/api/chat', chatRoutes);

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
