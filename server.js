import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";

// Load environment variables from .env file
dotenv.config({
    path: './.env'
});

// Initialize Express app
const app = express();

// Set up CORS policy
app.use(cors({
    origin: "https://dash-front-7orw.vercel.app",
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"]
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import Routes
import userRouter from "./src/routes/user.routes.js";

// Other routes can be imported here

app.use("/api/v1/users", userRouter);
// Other routes can be used here

// Root route
app.get('/', (req, res) => {
    console.log("Root endpoint reached");
    res.send("Hello, world!");  // Sending a response to the client
});

// Connect to MongoDB
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed: ", err);
    });

