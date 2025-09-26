const express = require("express");
const router = express.Router();
const { getItems, createItem } = require("../controllers/itemController");
const validateItem = require("../middleware/validateItem");
const multer = require("multer");

// setup storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder tujuan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // kasih nama unik
  },
});

const upload = multer({ storage });

// GET items
router.get("/", getItems);

// POST item dengan multiple images
router.post("/", upload.array("images", 5), validateItem, createItem);

module.exports = router;
