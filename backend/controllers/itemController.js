const Item = require("../models/Item");

// GET /Items
const getItems = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const items = await Item.find(query)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await Item.countDocuments(query);

  res.json({
    items,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  });
};

// POST /Items
const createItem = async (req, res) => {
  try {
    const { name, description, condition, startingPrice, estimatedValue } =
      req.body;

    // ambil path semua file yang di-upload
    const images = req.files ? req.files.map((file) => file.path) : [];

    const item = new Item({
      name,
      description,
      condition,
      images, // array of file path
      startingPrice,
      estimatedValue,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
};

module.exports = { getItems, createItem };
