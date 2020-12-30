import express from "express";
import pool from "./db";

const app: express.Application = express();

//middleware
app.use(express.json()); //req.body

//ROUTES//

//create a post
app.post("/posts", async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (title, body) VALUES($1, $2) RETURNING *",
      [title, body]
    );

    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all posts
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a post
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      id,
    ]);

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a post
app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const updatePost = await pool.query(
      "UPDATE posts SET title = $1, body = $2 WHERE post_id = $3",
      [title, body, id]
    );

    res.json("Post updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query(
      "DELETE FROM posts WHERE post_id = $1",
      [id]
    );
    res.json("Post deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
