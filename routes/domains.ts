import express from "express";
import pool from "../src/db";

const router: express.Router = express.Router();

//DOMAINS

//create a domain
router.post("/", async (req, res) => {
  try {
    const { domainName, description, user_id } = req.body;
    const newDomain = await pool.query(
      "INSERT INTO domains (domain_name, description, owner, created_at) VALUES($1, $2, $3, current_timestamp) RETURNING *",
      [domainName, description, user_id]
    );

    res.json(newDomain.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a domain
router.get("/:domain_id", async (req, res) => {
  try {
    const { domain_id } = req.params;
    const domain = await pool.query(
      "SELECT * FROM domains WHERE domain_name = $1",
      [domain_id]
    );

    res.json(domain.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all the domains
router.get("/", async (req, res) => {
  try {
    const domain = await pool.query("SELECT * FROM domains ");

    res.json(domain.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a domain
router.put("/:domain_id", async (req, res) => {
  try {
    const { domain_id } = req.params;
    const { description } = req.body;
    const updateDomain = await pool.query(
      "UPDATE domains SET description = $1 WHERE domain_name = $2",
      [description, domain_id]
    );

    res.json("Domain updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a domain
router.delete("/:domain_id", async (req, res) => {
  try {
    const { domain_id } = req.params;
    const deleteDomain = await pool.query(
      "DELETE FROM domains WHERE domain_name = $1",
      [domain_id]
    );
    res.json("Domain deleted");
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
