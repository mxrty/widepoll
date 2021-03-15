import express from "express";
import pool from "../src/db";

import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//POLLS

//create a poll
router.post("/", authorise, async (req, res) => {
  try {
    const { title, description, user_id, pollOptions } = req.body;
    const newPoll = await pool.query(
      "INSERT INTO polls (title, description, author, created_at) VALUES($1, $2, $3, current_timestamp) RETURNING *",
      [title, description, user_id]
    );

    const poll_id = newPoll.rows[0].poll_id;

    var optionValues = `('${pollOptions[0].body}', ${poll_id}, ${user_id}, current_timestamp)`;

    for (let i = 1; i < pollOptions.length; i++) {
      optionValues += `, ('${pollOptions[i].body}', ${poll_id}, ${user_id}, current_timestamp)`;
    }

    const newPollOptions = await pool.query(
      `INSERT INTO poll_options (body, poll_id, author, created_at) VALUES ${optionValues} RETURNING *`
    );

    res.json(newPoll.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a poll
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await pool.query("SELECT * FROM POLLS WHERE POLL_ID = $1", [
      id,
    ]);

    const pollOptions = await pool.query(
      "SELECT POLL_OPTIONS.OPTION_ID, POLL_OPTIONS.BODY, COALESCE(COUNTS.VOTES, 0) AS VOTES  FROM (SELECT * FROM POLL_OPTIONS WHERE POLL_ID = $1) AS POLL_OPTIONS LEFT OUTER JOIN (SELECT OPTION_ID, COUNT(*) AS VOTES FROM POLL_VOTES GROUP BY OPTION_ID) AS COUNTS ON (POLL_OPTIONS.OPTION_ID = COUNTS.OPTION_ID)",
      [id]
    );
    //console.log(pollOptions);

    poll.rows[0].options = pollOptions.rows;

    res.json(poll.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a poll vote
router.post("/vote", authorise, async (req, res) => {
  try {
    const { optionId, pollId, user_id } = req.body;

    const vote = await pool.query(
      "SELECT * FROM poll_votes WHERE option_id = $1 AND poll_id = $2 AND user_id = $3",
      [optionId, pollId, user_id]
    );

    if (vote.rows.length === 0) {
      const newVote = await pool.query(
        "INSERT INTO poll_votes (option_id, poll_id, user_id, voted_at) VALUES($1, $2, $3, current_timestamp) RETURNING *",
        [optionId, pollId, user_id]
      );
      res.json(newVote.rows[0]);
    } else {
      res.status(404).send("Poll has already been voted on by the user");
    }
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
