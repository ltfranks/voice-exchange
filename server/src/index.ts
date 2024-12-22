import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"], // Vite's dev server
};

app.use(cors(corsOptions));

app.get("/api", (req: Request, res: Response) => {
    res.json({ fruits: ["apple", "strawberry", "pineapple"] });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
