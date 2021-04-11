import { verify as _verify } from "jsonwebtoken";
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

export default function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if there is a token
  if (!token) {
    return res.status(403).send("No token given, authorisation denied");
  }

  // Verify token
  try {
    const verify = _verify(token, process.env.jwtSecret);
    req.user = verify.user;
    next();
  } catch (err) {
    // TODO: Force relogin
    res.status(401).send("Token is not valid");
  }
}
