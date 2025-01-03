import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js'; // need the file extension ".js" here even for ts
import authRoutes from './routes/authRoutes.js'; // need the file extension ".js" here even for ts
dotenv.config();
const app = express();
// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/voice-exchange')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));
// http://localhost:8080/hello to test
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
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
