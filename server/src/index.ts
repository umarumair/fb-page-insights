import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import { config } from "dotenv";
import passport from "passport";
import cors from "cors";
import User from "./models/User";
import session from "express-session"

config();

const PORT = 8000;
const app = express();


app.set('trust proxy', true);

app.use(cors());
app.use(express.json());


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`App listening at ${PORT}`);
    app.listen(PORT);
});


app.get("/", (req: Request, res: Response) => {
    res.send({ hello: "how" });
}); 

app.get("/done", (req: Request, res: Response) => {
    res.send({ facebook: "ok" });
}); 





app.use(passport.initialize());
app.use(passport.session());

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
