import express from "express";

import pool from "../src/db";
import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//REPRESENTATIVES

//make user a representative
router.post("/", authorise, async (req, res) => {
  try {
    const { user_id, domain } = req.body;
    const createRep = await pool.query(
      "INSERT INTO representatives (rep_id, domain, became_rep_at) VALUES ($1, $2, current_timestamp) RETURNING * ",
      [user_id, domain]
    );
    res.json({ isRep: true, domain: { domain: domain } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//follow a representative
router.post("/follow", authorise, async (req, res) => {
  try {
    const { user_id, domain, rep_id, optIn } = req.body;

    const existingFollow = await pool.query(
      "SELECT * FROM REP_FOLLOWERS WHERE REP_ID = $1 AND FOLLOWER_ID = $2 AND DOMAIN = $3",
      [rep_id, user_id, domain]
    );

    if (existingFollow.rows.length === 0) {
      const largestRank = await pool.query(
        "SELECT MAX(RANK) FROM REP_FOLLOWERS WHERE FOLLOWER_ID = $1 AND DOMAIN = $2",
        [user_id, domain]
      );

      const nextRank =
        largestRank.rows[0].max === null
          ? 0
          : parseInt(largestRank.rows[0].max) + 1;

      const followRep = await pool.query(
        "INSERT INTO rep_followers (rep_id, follower_id, followed_at, rank, opt_in, domain) VALUES($1, $2, current_timestamp, $3, $4, $5) RETURNING *",
        [rep_id, user_id, nextRank, optIn, domain]
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
