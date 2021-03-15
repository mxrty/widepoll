import express from "express";
import bcrypt from "bcrypt";

import pool from "../src/db";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middleware/validInfo";
import authorise from "../middleware/authorise";

const router: express.Router = express.Router();

//AUTH

//register
router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, is_representative, created_at) VALUES ($1, $2, $3, FALSE, current_timestamp) RETURNING *",
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//login
router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    const { user_id, user_name, user_email, is_representative } = user.rows[0];
    return res.json({
      user_id,
      user_name,
      user_email,
      isRep: is_representative,
      jwt_token: jwtToken,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//verify
router.get("/verify", authorise, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//make user a representative
router.post("/rep", authorise, async (req, res) => {
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
router.post("/rep/follow", authorise, async (req, res) => {
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

//get a user
router.get("/user/:user_id", async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const user = await pool.query("SELECT * FROM USERS WHERE USER_ID = $1", [
      user_id,
    ]);

    const followers = await pool.query(
      "SELECT FOLLOWER_ID FROM REP_FOLLOWERS WHERE REP_ID = $1",
      [user_id]
    );

    const following = await pool.query(
      "SELECT REP_ID, RANK FROM REP_FOLLOWERS WHERE FOLLOWER_ID = $1",
      [user_id]
    );

    const { user_name, is_representative } = user.rows[0];
    return res.json({
      user_id,
      user_name,
      isRep: is_representative,
      followers: followers.rows,
      following: following.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
