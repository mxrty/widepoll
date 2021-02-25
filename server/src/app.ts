import express from "express";
import cors from "cors";
import postRoutes from "../routes/posts";
import domainRoutes from "../routes/domains";
import authRoutes from "../routes/auth";
import commentRoutes from "../routes/comments";
import solutionRoutes from "../routes/solutions";

const app: express.Application = express();

//MIDDLEWARE
app.use(express.json()); //req.body
app.use(cors());

//ROUTES
app.use("/posts", postRoutes);
app.use("/domains", domainRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/solutions", solutionRoutes);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
