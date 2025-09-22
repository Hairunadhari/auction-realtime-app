const User = require('../models/User');

// GET /Users
const getUsers = async (req, res) => {
  const users = await User.find().sort({ date: -1 });
  res.json(users);
};

// POST /Users
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json(User);
};

module.exports = { getUsers, createUser };
