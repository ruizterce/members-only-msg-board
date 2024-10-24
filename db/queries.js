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

  addMessage: async (title, text, user_id) => {
    try {
      await pool.query(
        "INSERT INTO messages (title, text, author_id) VALUES ($1, $2, $3)",
        [title, text, user_id]
      );
    } catch (error) {
      console.error("Error storing message:", error);
      throw new Error("Could not store message. Please try again later.");
    }
  },

  getAllMessages: async () => {
    try {
      const { rows } = await pool.query(
        "SELECT message_id, timestamp, title, text, author_id, username FROM messages LEFT JOIN users ON messages.author_id = users.user_id"
      );
      return rows;
    } catch (error) {
      console.error("Error retrieving messages:", error);
      throw new Error("Could not retrieve messages. Please try again later.");
    }
  },

  deleteMessageById: async (message_id) => {
    try {
      await pool.query("DELETE FROM messages WHERE message_id = $1", [
        message_id,
      ]);
      return;
    } catch (error) {
      console.error(`Error deleting message ${message_id}:`, error);
      throw new Error(
        `Could not delete message ${message_id}. Please try again later.`
      );
    }
  },
};
