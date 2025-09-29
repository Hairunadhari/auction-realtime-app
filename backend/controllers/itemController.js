const Item = require("../models/Item");

// GET /Items
const getItems = async (req, res) => {
  const { page = 1, limit = 6, search = "" } = req.query;
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

    // ambil URL backend dari request yg sedang jalan
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    // buat array full URL
    const images = req.files
      ? req.files.map((file) => baseUrl + file.filename)
      : [];

    const item = new Item({
      name,
      description,
      condition,
      images,
      startingPrice,
      estimatedValue,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }

  // GET /items/:id
  
};
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};


module.exports = { getItems, createItem, getItemById };
