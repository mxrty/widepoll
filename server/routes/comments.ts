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
      "SELECT COMMENTS.*, \
      COALESCE(COUNTS.LIKES, \
              0) AS LIKES \
      FROM \
            (SELECT * \
              FROM COMMENTS \
              WHERE POST_ID = $1) AS COMMENTS \
      LEFT OUTER JOIN \
            (SELECT ENTITY_ID, \
                COUNT(*) AS LIKES \
              FROM VOTES \
              WHERE ENTITY = 'COMMENT' \
              GROUP BY ENTITY_ID) AS COUNTS ON (COMMENTS.COMMENT_ID = COUNTS.ENTITY_ID)",
      [post_id]
    );

    // comments.rows.forEach((comment) => {
    //   let likes = parseInt(comment.likes);
    //   comment.likes = likes;
    // });

    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a new like for a comment
router.post("/like/:comment_id", async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { user_id } = req.body;

    const like = await pool.query(
      "SELECT * FROM votes WHERE entity_id = $1 AND entity = 'COMMENT' AND user_id = $2",
      [comment_id, user_id]
    );

    if (like.rows.length === 0) {
      const newCommentLike = await pool.query(
        "INSERT INTO votes (entity_id, user_id, voted_at, entity, vote_type) VALUES($1, $2, current_timestamp, 'COMMENT', 'USER') RETURNING *",
        [comment_id, user_id]
      );
    }

    const updatedLikeCount = await pool.query(
      "SELECT COUNT(*) AS LIKES FROM VOTES WHERE ENTITY_ID = $1 AND ENTITY = 'COMMENT'",
      [comment_id]
    );

    res.json(updatedLikeCount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//removes a like for a comment
router.post("/unlike/:comment_id", async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { user_id } = req.body;

    const unlike = await pool.query(
      "DELETE FROM votes WHERE entity_id = $1 AND entity = 'COMMENT' AND user_id = $2",
      [comment_id, user_id]
    );
    const updatedLikeCount = await pool.query(
      "SELECT COUNT(*) AS LIKES FROM VOTES WHERE ENTITY_ID = $1 AND ENTITY = 'COMMENT'",
      [comment_id]
    );

    res.json(updatedLikeCount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
