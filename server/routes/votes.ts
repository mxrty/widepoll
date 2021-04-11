import express from "express";
import pool from "../src/db";

import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//VOTES

//get all pending votes for a user
router.post("/pending", async (req, res) => {
  try {
    const { user_id } = req.body;

    const pendingVotes = await pool.query(
      "SELECT * FROM PENDING_VOTES WHERE FOLLOWER_ID = $1",
      [user_id]
    );

    res.json(pendingVotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//remove a pending vote
router.post("/:entity_id", async (req, res) => {
  try {
    const { entity_id } = req.params;
    const { user_id, entity } = req.body;

    const removePendingLike = await pool.query(
      "DELETE FROM PENDING_VOTES WHERE ENTITY = $1 AND ENTITY_ID = $2 AND FOLLOWER_ID = $3 RETURNING *",
      [entity, entity_id, user_id]
    );

    res.json(removePendingLike.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
