import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import "./passport/githubAuth.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => {
  console.log("server started on http://localhost:5000");
  connectMongoDB();
});
