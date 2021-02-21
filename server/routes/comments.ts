import express from "express";
import pool from "../src/db";

const router: express.Router = express.Router();

//COMMENTS

//create a comment
router.post("/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const { comment, commentType, parentId, user_id } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (comment_body, created_at, comment_type, post_id, parent_id, author) VALUES($1, current_timestamp, $2, $3, $4, $5) RETURNING *",
      [comment, commentType, post_id, parentId, user_id]
    );

    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a post's comments
router.get("/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [post_id]
    );

    /* Construct comment tree before response
        comments: {
            post_id:{post_comments}
            }
    */
    res.json(comments);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
