import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import { config } from "dotenv";
import cors from "cors";
import User from "./models/User";

config();

const PORT = 8000;
const app = express();


app.set('trust proxy', true);

app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send({ hello: "how" });
}); 

app.get("/done", (req: Request, res: Response) => {
    res.send({ facebook: "ok" });
}); 

app.post("/user", async (req: Request, res: Response) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });
    const createdUser = await newUser.save();
    res.json(createdUser);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`App listening at ${PORT}`);
    app.listen(PORT);
});

interface RouteLayer {
    route?: {
      path: string;
    };
}

(app._router.stack as RouteLayer[]).forEach(function (r: RouteLayer) {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});
