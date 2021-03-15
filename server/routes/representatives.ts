import express from "express";

import pool from "../src/db";
import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//REPRESENTATIVES

//make user a representative
router.post("/", authorise, async (req, res) => {
  try {
    const { user_id } = req.body;
    const changeToRep = await pool.query(
      "UPDATE USERS SET IS_REPRESENTATIVE = TRUE WHERE USER_ID = $1 ",
      [user_id]
    );
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//follow a representative
router.post("/follow", authorise, async (req, res) => {
  try {
    const { user_id, rep_id, optIn } = req.body;

    const existingFollow = await pool.query(
      "SELECT * FROM REP_FOLLOWERS WHERE REP_ID = $1 AND FOLLOWER_ID = $2",
      [rep_id, user_id]
    );

    if (existingFollow.rows.length === 0) {
      const largestRank = await pool.query(
        "SELECT MAX(RANK) FROM REP_FOLLOWERS WHERE FOLLOWER_ID = $1",
        [user_id]
      );

      const nextRank =
        largestRank.rows[0].max === null
          ? 0
          : parseInt(largestRank.rows[0].max) + 1;

      const followRep = await pool.query(
        "INSERT INTO rep_followers (rep_id, follower_id, followed_at, rank, opt_in) VALUES($1, $2, current_timestamp, $3, $4) RETURNING *",
        [rep_id, user_id, nextRank, optIn]
      );

      res.json(followRep.rows[0]);
    } else {
      res.json("User is already following this representative");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
