import express from "express";
import pool from "../src/db";

import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//POSTS

//create a post
router.post("/", authorise, async (req, res) => {
  try {
    const { title, body, domain, postType, user_id } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (title, post_body, domain, post_type, author, created_at) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",
      [title, body, domain, postType, user_id]
    );

    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a post
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const updatePost = await pool.query(
      "UPDATE posts SET title = $1, post_body = $2 WHERE post_id = $3",
      [title, body, id]
    );

    res.json("Post updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
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

export default router;
