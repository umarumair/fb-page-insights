import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import passport from "./services/passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/auth";

config();

console.log("Starting server and configuring middleware");

const PORT = process.env.PORT || 8000;
const app = express();

// Trusting first proxy to enable HTTPS redirection
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
// Session middleware with MongoStore
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL!,
    ttl: 7 * 24 * 60 * 60,
  }),
});

// Apply session middleware before Passport
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Example routes
app.get("/", (req: Request, res: Response) => {
  console.log("hello from console");
  res.send({ hello: "how" });
});
app.get("/done", (req: Request, res: Response) => {
  res.send({ facebook: "ok" });
});

// Logging routes
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
