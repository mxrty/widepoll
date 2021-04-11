import express from "express";
import pool from "../src/db";

const router: express.Router = express.Router();

//USER

//get a user
router.get("/:user_id", async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const user = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);

    const followers = await pool.query(
      "SELECT FOLLOWERS.FOLLOWER_ID, FOLLOWERS.DOMAIN, USERS.USER_NAME FROM (SELECT FOLLOWER_ID, DOMAIN, REP_ID FROM REP_FOLLOWERS WHERE REP_ID = $1) AS FOLLOWERS LEFT OUTER JOIN (SELECT USER_ID, USER_NAME FROM USERS) AS USERS ON (USERS.USER_ID = FOLLOWERS.FOLLOWER_ID)",
      [user_id]
    );

    const following = await pool.query(
      "SELECT FOLLOWING.REP_ID, FOLLOWING.RANK, FOLLOWING.DOMAIN, FOLLOWING.OPT_IN, USERS.USER_NAME FROM (SELECT REP_ID, FOLLOWER_ID, RANK, DOMAIN, OPT_IN FROM REP_FOLLOWERS WHERE FOLLOWER_ID = $1) AS FOLLOWING LEFT OUTER JOIN (SELECT USER_ID, USER_NAME FROM USERS) AS USERS ON (USERS.USER_ID = FOLLOWING.REP_ID)",
      [user_id]
    );

    const domainsRepresented = await pool.query(
      "SELECT DOMAIN FROM representatives where rep_id = $1",
      [user_id]
    );

    interface domainFollowers {
      [key: string]: any;
    }

    const followingByDomain: domainFollowers = {};

    following.rows.forEach((followed) => {
      const domain = followingByDomain[followed.domain];
      if (!domain) {
        followingByDomain[followed.domain] = [];
      }
      followingByDomain[followed.domain].push(followed);
    });

    Object.keys(followingByDomain).forEach((domain) => {
      followingByDomain[domain].sort((a: any, b: any) => {
        return a.rank - b.rank;
      });
    });

    const { user_name, created_at } = user.rows[0];
    return res.json({
      user_id,
      user_name,
      joined: created_at,
      isRep: domainsRepresented.rows.length === 0 ? false : true,
      domainsRepresented: domainsRepresented.rows,
      followers: followers.rows,
      following: followingByDomain,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get a user's recent activity
router.get("/activity/:user_id", async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const user = await pool.query(
      "SELECT * \
      FROM \
              (SELECT 'NEW' AS ACTIVITY_TYPE, \
                  'SOLUTION' AS ENTITY, \
                  SOLUTION_ID AS ENTITY_ID, \
                  CREATED_AT AS ACTIVITY_TIME, \
                  NULL AS VOTE_TYPE, \
                  AUTHOR AS USER_ID, \
                  NULL AS REP_ID, \
                  ISSUE_ID, \
                  NULL AS DOMAIN, \
                  CAST(NULL AS JSONB) AS SENTIMENT \
                FROM SOLUTIONS \
                WHERE AUTHOR = $1 \
                UNION SELECT 'VOTE' AS ACTIVITY_TYPE, \
                  ENTITY, \
                  ENTITY_ID, \
                  VOTED_AT AS ACTIVITY_TIME, \
                  VOTE_TYPE, \
                  USER_ID, \
                  REP_ID, \
                  NULL AS ISSUE_ID, \
                  NULL AS DOMAIN, \
                  NULL AS SENTIMENT \
                FROM VOTES \
                WHERE USER_ID = $1 \
                UNION SELECT 'VOTE' AS ACTIVITY_TYPE, \
                  'POST' AS ENTITY, \
                  POST_ID AS ENTITY_ID, \
                  VOTED_AT AS ACTIVITY_TIME, \
                  'USER' AS VOTE_TYPE, \
                  USER_ID, \
                  NULL AS REP_ID, \
                  NULL AS ISSUE_ID, \
                  NULL AS DOMAIN, \
                  NULL AS SENTIMENT \
                FROM POST_VOTES \
                WHERE USER_ID = $1 \
                UNION SELECT 'NEW' AS ACTIVITY_TYPE, \
                  'COMMENT' AS ENTITY, \
                  COMMENT_ID AS ENTITY_ID, \
                  CREATED_AT AS ACTIVITY_TIME, \
                  NULL AS VOTE_TYPE, \
                  AUTHOR AS USER_ID, \
                  NULL AS REP_ID, \
                  NULL AS ISSUE_ID, \
                  NULL AS DOMAIN, \
                  NULL AS SENTIMENT \
                FROM COMMENTS \
                WHERE AUTHOR = $1 \
                UNION SELECT 'NEW' AS ACTIVITY_TYPE, \
                  'POST' AS ENTITY, \
                  POST_ID AS ENTITY_ID, \
                  CREATED_AT AS ACTIVITY_TIME, \
                  NULL AS VOTE_TYPE, \
                  AUTHOR AS USER_ID, \
                  NULL AS REP_ID, \
                  NULL AS ISSUE_ID, \
                  NULL AS DOMAIN, \
                  NULL AS SENTIMENT \
                FROM POSTS \
                WHERE AUTHOR = $1 \
                UNION SELECT 'FOLLOW' AS ACTIVITY_TYPE, \
                  'REP' AS ENTITY, \
                  REP_ID AS ENTITY_ID, \
                  FOLLOWED_AT AS ACTIVITY_TIME, \
                  NULL AS VOTE_TYPE, \
                  FOLLOWER_ID AS USER_ID, \
                  REP_ID AS REP_ID, \
                  NULL AS ISSUE_ID, \
                  DOMAIN, \
                  NULL AS SENTIMENT \
                FROM REP_FOLLOWERS \
                WHERE FOLLOWER_ID = $1 \
                UNION SELECT 'NEW' AS ACTIVITY_TYPE, \
                  'DOMAIN' AS ENTITY, \
                  NULL AS ENTITY_ID, \
                  CREATED_AT AS ACTIVITY_TIME, \
                  NULL AS VOTE_TYPE, \
                  OWNER AS USER_ID, \
                  NULL AS REP_ID, \
                  NULL AS ISSUE_ID, \
                  DOMAIN_NAME AS DOMAIN, \
                  NULL AS SENTIMENT \
                FROM DOMAINS \
                WHERE OWNER = $1 \
                UNION SELECT 'NEW_SENTIMENT' AS ACTIVITY_TYPE, \
                  ENTITY, \
                  ENTITY_ID, \
                  CREATED_AT AS ACTIVITY_TIME, \
                  NULL AS VOTE_TYPE, \
                  USER_ID AS USER_ID, \
                  NULL AS REP_ID, \
                  NULL AS ISSUE_ID, \
                  NULL AS DOMAIN, \
                  SENTIMENT \
                FROM SENTIMENTS \
                WHERE USER_ID = $1) AS USER_ACTIVITY \
      ORDER BY ACTIVITY_TIME DESC \
      LIMIT 10",
      [user_id]
    );

    return res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
