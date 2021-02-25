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
      "SELECT * FROM solutions WHERE issue_id = $1",
      [id]
    );

    res.json(solutions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
