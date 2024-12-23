import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js'; // need the file extension ".js" here even for ts
// Load environment variables
dotenv.config();
const app = express();
app.get("/hello", (_, res) => {
    res.send(`<h1>Hello!</h1>
         <p>Server is up and running.</p>
        `);
});
// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));
// Middleware to parse JSON
app.use(express.json());
// Use the chat routes
app.use('/chat', chatRoutes);
// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
