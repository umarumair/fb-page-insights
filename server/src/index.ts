import express , {Request, Response} from "express"
import mongoose from 'mongoose';
import {config} from "dotenv";
config();
import User from "./models/User"


const PORT = 8000;
const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
}); 

app.post("/user", async (req: Request, res: Response) => {
    const newUser = new User({
        name : req.body.name,
        email : req.body.email
    });
    const createdUser = await newUser.save();
    res.json(createdUser)
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`App listening at ${PORT}`);
app.listen(PORT);
});