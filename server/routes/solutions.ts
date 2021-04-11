import express from "express";
import pool from "../src/db";

import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//SOLUTIONS

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
      "SELECT solutions.*, COALESCE(COUNTS.LIKES,0) as likes FROM (SELECT * FROM SOLUTIONS WHERE ISSUE_ID = $1) AS SOLUTIONS LEFT OUTER JOIN (SELECT ENTITY_ID, COUNT(*) AS LIKES FROM VOTES WHERE ENTITY = 'SOLUTION' GROUP BY ENTITY_ID) AS COUNTS ON (SOLUTIONS.SOLUTION_ID = COUNTS.ENTITY_ID)",
      [id]
    );

    solutions.rows.forEach((solution) => {
      let likes = parseInt(solution.likes);
      solution.likes = likes;
    });

    res.json(solutions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a single solution
router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await pool.query(
      "SELECT SOLUTIONS.*,\
      POSTS.DOMAIN,\
      COALESCE(COUNTS.LIKES,\
              0) AS LIKES\
    FROM\
            (SELECT *\
              FROM SOLUTIONS\
              WHERE SOLUTION_ID = $1) AS SOLUTIONS\
    LEFT OUTER JOIN\
            (SELECT ENTITY_ID,\
                COUNT(*) AS LIKES\
              FROM VOTES\
              WHERE ENTITY = 'SOLUTION'\
              GROUP BY ENTITY_ID) AS COUNTS ON (SOLUTIONS.SOLUTION_ID = COUNTS.ENTITY_ID)\
    LEFT OUTER JOIN POSTS ON (POSTS.POST_ID = SOLUTIONS.ISSUE_ID)",
      [id]
    );

    res.json(solution.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a new like for a solution
router.post("/like/:solution_id", async (req, res) => {
  try {
    const { solution_id } = req.params;
    const { user_id, isRep } = req.body;

    const like = await pool.query(
      "SELECT * FROM VOTES WHERE ENTITY_ID = $1 AND USER_ID = $2 AND ENTITY = 'SOLUTION'",
      [solution_id, user_id]
    );

    const pendingLike = await pool.query(
      "SELECT * FROM PENDING_VOTES WHERE ENTITY = 'SOLUTION' AND ENTITY_ID = $1 AND FOLLOWER_ID = $2",
      [solution_id, user_id]
    );

    //if pending like exists, remove as will create a new like
    if (pendingLike.rows.length > 0) {
      const removePendingLike = await pool.query(
        "DELETE FROM PENDING_VOTES WHERE ENTITY = 'SOLUTION' AND ENTITY_ID = $1 AND FOLLOWER_ID = $2",
        [solution_id, user_id]
      );
    }

    //insert new like, or update to user like from rep like
    if (like.rows.length === 0) {
      const newSolutionLike = await pool.query(
        "INSERT INTO VOTES (entity, entity_id, user_id, voted_at, vote_type) VALUES('SOLUTION', $1, $2, current_timestamp, 'USER') RETURNING *",
        [solution_id, user_id]
      );
    } else if (like.rows[0].vote_type === "REP") {
      const updateSolutionLike = await pool.query(
        "UPDATE VOTES SET vote_type = 'USER' WHERE entity_id = $1 AND user_id = $2 AND entity = 'SOLUTION' RETURNING *",
        [solution_id, user_id]
      );
    }

    const followers = await pool.query(
      "SELECT FOLLOWER_ID, OPT_IN, RANK FROM REP_FOLLOWERS \
    INNER JOIN POSTS ON POSTS.DOMAIN = REP_FOLLOWERS.DOMAIN \
    INNER JOIN SOLUTIONS ON POSTS.POST_ID = SOLUTIONS.ISSUE_ID \
    WHERE SOLUTIONS.SOLUTION_ID = $1 AND REP_FOLLOWERS.REP_ID = $2",
      [solution_id, user_id]
    );

    if (followers.rows.length !== 0) {
      followers.rows.forEach(async (follower) => {
        const followerLike = await pool.query(
          "SELECT * FROM VOTES WHERE entity_id = $1 AND user_id = $2 AND entity = 'SOLUTION'",
          [solution_id, follower.follower_id]
        );

        const pendingFollowerLike = await pool.query(
          "SELECT * FROM PENDING_VOTES WHERE ENTITY = 'SOLUTION' AND ENTITY_ID = $1 AND FOLLOWER_ID = $2",
          [solution_id, follower.follower_id]
        );

        if (follower.opt_in === true && followerLike.rows.length === 0) {
          const newSolutionLike = await pool.query(
            "INSERT INTO VOTES (entity, entity_id, user_id, voted_at, vote_type, rep_id) VALUES('SOLUTION', $1, $2, current_timestamp, 'REP', $3) RETURNING *",
            [solution_id, follower.follower_id, user_id]
          );
          if (pendingFollowerLike.rows.length > 0) {
            const removePendingLike = await pool.query(
              "DELETE FROM PENDING_VOTES WHERE ENTITY = 'SOLUTION' AND ENTITY_ID = $1 AND FOLLOWER_ID = $2",
              [solution_id, follower.follower_id]
            );
          }
        } else if (
          follower.opt_in === false &&
          followerLike.rows.length === 0 &&
          pendingFollowerLike.rows.length === 0
        ) {
          const newPendingLike = await pool.query(
            "INSERT INTO PENDING_VOTES (entity, entity_id, created_at, follower_id, rep_id) VALUES('SOLUTION', $1, current_timestamp, $2, $3) RETURNING *",
            [solution_id, follower.follower_id, user_id]
          );
        }
      });
    }

    const updatedLikeCount = await pool.query(
      "SELECT COUNT(*) AS LIKES FROM VOTES WHERE ENTITY_ID = $1 AND ENTITY = 'SOLUTION'",
      [solution_id]
    );

    res.json(updatedLikeCount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//removes a like for a solution
router.post("/unlike/:solution_id", async (req, res) => {
  try {
    const { solution_id } = req.params;
    const { user_id, isRep } = req.body;

    const unlike = await pool.query(
      "DELETE FROM votes WHERE entity_id = $1 AND entity = 'SOLUTION' AND (user_id = $2 OR rep_id = $2)",
      [solution_id, user_id]
    );

    const updatedLikeCount = await pool.query(
      "SELECT COUNT(*) AS LIKES FROM VOTES WHERE ENTITY_ID = $1 AND ENTITY = 'SOLUTION'",
      [solution_id]
    );

    res.json(updatedLikeCount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
