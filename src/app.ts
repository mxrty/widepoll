import express from "express";
import cors from "cors";
import path from "path";
import postRoutes from "../routes/posts";
import domainRoutes from "../routes/domains";
import authRoutes from "../routes/auth";
import commentRoutes from "../routes/comments";
import solutionRoutes from "../routes/solutions";
import pollRoutes from "../routes/polls";
import repRoutes from "../routes/representatives";
import userRoutes from "../routes/users";
import voteRoutes from "../routes/votes";

const PORT = process.env.PORT || 5000;

const app: express.Application = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES
app.use("/posts", postRoutes);
app.use("/domains", domainRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/solutions", solutionRoutes);
app.use("/polls", pollRoutes);
app.use("/reps", repRoutes);
app.use("/users", userRoutes);
app.use("/votes", voteRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
