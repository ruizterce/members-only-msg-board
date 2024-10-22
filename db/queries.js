const pool = require("./pool");

module.exports = {
  addUser: async (first_name, last_name, username, email, password) => {
    try {
      await pool.query(
        // TODO hash password before storing
        "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)",
        [first_name, last_name, username, email, password]
      );
    } catch (error) {
      console.error("Error storing user:", error);
      throw new Error("Could not store user. Please try again later.");
    }
  },
};
