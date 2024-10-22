const bcrypt = require("bcryptjs");

async function validPassword(password, storedPassword) {
  try {
    const match = await bcrypt.compare(password, storedPassword);
    return match;
  } catch (err) {
    console.error("Error comparing password:", err);
    return null;
  }
}

async function genPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    return null;
  }
}

module.exports = { validPassword, genPassword };
