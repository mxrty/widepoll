import { sign } from "jsonwebtoken";
require("dotenv").config();

const jwtGenerator = (user_id) => {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return sign(payload, process.env.jwtSecret, { expiresIn: "24h" });
};

export default jwtGenerator;
