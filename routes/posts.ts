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

    newPost.rows[0].likes = 0;

    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await pool.query(
      "SELECT POSTS.*, COALESCE(COUNTS.LIKES,0) as likes FROM (SELECT * FROM POSTS) AS POSTS LEFT OUTER JOIN (SELECT POST_ID, COUNT(*) AS LIKES FROM POST_VOTES GROUP BY POST_ID) AS COUNTS ON (POSTS.POST_ID = COUNTS.POST_ID)"
    );

    allPosts.rows.forEach((post) => {
      let likes = parseInt(post.likes);
      post.likes = likes;
    });

    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query(
      "SELECT POSTS.*, \
      COALESCE(COUNTS.LIKES, \
              0) AS LIKES, \
      USERS.USER_NAME AS AUTHOR_NAME \
    FROM \
            (SELECT * \
              FROM POSTS \
              WHERE POST_ID = $1) AS POSTS \
    LEFT OUTER JOIN \
            (SELECT POST_ID, \
                COUNT(*) AS LIKES \
              FROM POST_VOTES \
              GROUP BY POST_ID) AS COUNTS ON (POSTS.POST_ID = COUNTS.POST_ID) \
    LEFT OUTER JOIN \
            (SELECT * \
              FROM USERS) AS USERS ON USERS.USER_ID = POSTS.AUTHOR",
      [id]
    );

    post.rows[0].likes = parseInt(post.rows[0].likes);

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get (n) most recent posts
router.get("/latest/:num", async (req, res) => {
  try {
    const { num } = req.params;
    const latestPosts = await pool.query(
      "SELECT POSTS.*, COALESCE(COUNTS.LIKES,0) as likes FROM (SELECT * FROM POSTS ORDER BY CREATED_AT DESC FETCH FIRST $1 ROWS ONLY) AS POSTS LEFT OUTER JOIN (SELECT POST_ID, COUNT(*) AS LIKES FROM POST_VOTES GROUP BY POST_ID) AS COUNTS ON (POSTS.POST_ID = COUNTS.POST_ID)",
      [num]
    );

    latestPosts.rows.forEach((post) => {
      let likes = parseInt(post.likes);
      post.likes = likes;
    });

    res.json(latestPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a new like for a comment
router.post("/like/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const { user_id, isRep } = req.body;

    const like = await pool.query(
      "SELECT * FROM post_votes WHERE post_id = $1 AND user_id = $2",
      [post_id, user_id]
    );

    if (like.rows.length === 0) {
      const newPostLike = await pool.query(
        "INSERT INTO post_votes (post_id, user_id, voted_at) VALUES($1, $2, current_timestamp) RETURNING *",
        [post_id, user_id]
      );
      res.json(newPostLike.rows[0]);
    } else {
      res.status(404).send("Solution has already been liked by the user");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//removes a like for a comment
router.post("/unlike/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const { user_id, isRep } = req.body;

    const unlike = await pool.query(
      "DELETE FROM post_votes WHERE post_id = $1 AND user_id = $2",
      [post_id, user_id]
    );
    res.send("Like removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
