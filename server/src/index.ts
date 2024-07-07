import express , {Request, Response} from "express"
const app = express();

app.listen(8000)

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
}); 