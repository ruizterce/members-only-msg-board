const pool = require("./pool");

module.exports = {
  addUser: async (
    first_name,
    last_name,
    username,
    email,
    hashedPassword,
    membership_status
  ) => {
    try {
      await pool.query(
        "INSERT INTO users (first_name, last_name, username, email, password, membership_status) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          first_name,
          last_name,
          username,
          email,
          hashedPassword,
          membership_status,
        ]
      );
    } catch (error) {
      console.error("Error storing user:", error);
      throw new Error("Could not store user. Please try again later.");
    }
  },
};
