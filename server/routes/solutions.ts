import express from "express";
import pool from "../src/db";

import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//POSTS

//create a solution
router.post("/", authorise, async (req, res) => {
  try {
    const { issueId, title, body, user_id } = req.body;
    const newSolution = await pool.query(
      "INSERT INTO solutions (issue_id, title, post_body, author, created_at) VALUES($1, $2, $3, $4, current_timestamp) RETURNING *",
      [issueId, title, body, user_id]
    );

    res.json(newSolution.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all solutions for issue
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const solutions = await pool.query(
      "SELECT solutions.*, COALESCE(COUNTS.LIKES,0) as likes FROM (SELECT * FROM SOLUTIONS WHERE ISSUE_ID = $1) AS SOLUTIONS LEFT OUTER JOIN (SELECT SOLUTION_ID, COUNT(*) AS LIKES FROM SOLUTION_VOTES GROUP BY SOLUTION_ID) AS COUNTS ON (SOLUTIONS.SOLUTION_ID = COUNTS.SOLUTION_ID)",
      [id]
    );

    res.json(solutions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a new like for a comment
router.post("/like/:solution_id", async (req, res) => {
  try {
    const { solution_id } = req.params;
    const { user_id } = req.body;

    const like = await pool.query(
      "SELECT * FROM solution_votes WHERE solution_id = $1 AND user_id = $2",
      [solution_id, user_id]
    );

    if (like.rows.length === 0) {
      const newSolutionLike = await pool.query(
        "INSERT INTO solution_votes (solution_id, user_id, liked_at) VALUES($1, $2, current_timestamp) RETURNING *",
        [solution_id, user_id]
      );
      res.json(newSolutionLike.rows[0]);
    } else {
      res.json("Solution has already been liked by the user");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//removes a like for a comment
router.post("/unlike/:solution_id", async (req, res) => {
  try {
    const { solution_id } = req.params;
    const { user_id } = req.body;

    const unlike = await pool.query(
      "DELETE FROM solution_votes WHERE solution_id = $1 AND user_id = $2",
      [solution_id, user_id]
    );
    res.json("Like removed");
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
