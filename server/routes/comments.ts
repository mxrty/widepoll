import express from "express";
import pool from "../src/db";
import { isSentiment } from "../utils/sentimentConverter";

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

//create a new sentiment for a comment
router.post("/sentiment/:comment_id", async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { user_id, sentiment } = req.body;

    const existingSentiment = await pool.query(
      "SELECT * FROM sentiments WHERE entity_id = $1 AND entity = 'COMMENT' AND user_id = $2",
      [comment_id, user_id]
    );

    if (existingSentiment.rows.length === 0) {
      const newSentiment = await pool.query(
        "INSERT INTO sentiments (entity_id, user_id, created_at, entity, sentiment) VALUES($1, $2, current_timestamp, 'COMMENT', $3) RETURNING *",
        [comment_id, user_id, JSON.stringify(sentiment)]
      );
    } else {
      const updateSentiment = await pool.query(
        "UPDATE SENTIMENTS\
          SET SENTIMENT = $1\
          WHERE ENTITY = 'COMMENT'\
                  AND ENTITY_ID = $2\
                  AND USER_ID = $3",
        [JSON.stringify(sentiment), comment_id, user_id]
      );
    }

    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

//get a post's comment sentiments
router.get("/sentiment/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const sentiments = await pool.query(
      "SELECT COMMENTS.COMMENT_ID,\
      SENTIMENTS.SENTIMENT,\
      COMMENTS.AUTHOR,\
      COMMENTS.POST_ID\
    FROM\
            (SELECT *\
              FROM COMMENTS\
              WHERE POST_ID = $1) AS COMMENTS\
    INNER JOIN\
            (SELECT *\
              FROM SENTIMENTS\
              WHERE ENTITY = 'COMMENT') AS SENTIMENTS ON COMMENTS.COMMENT_ID = SENTIMENTS.ENTITY_ID",
      [post_id]
    );

    res.json(sentiments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
