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
      "SELECT FOLLOWER_ID, DOMAIN FROM REP_FOLLOWERS WHERE REP_ID = $1",
      [user_id]
    );

    const following = await pool.query(
      "SELECT REP_ID, RANK, DOMAIN FROM REP_FOLLOWERS WHERE FOLLOWER_ID = $1",
      [user_id]
    );

    const domainsRepresented = await pool.query(
      "SELECT DOMAIN FROM representatives where rep_id = $1",
      [user_id]
    );

    const { user_name } = user.rows[0];
    return res.json({
      user_id,
      user_name,
      isRep: domainsRepresented.rows.length === 0 ? false : true,
      domainsRepresented: domainsRepresented.rows,
      followers: followers.rows,
      following: following.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
