const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // nama barang
  description: { type: String }, // deskripsi barang
  condition: { type: String, enum: ["new", "used"]}, // kondisi barang
  images: [{ type: String }], // bisa lebih dari 1 gambar (URL)
  startingPrice: { type: Number, required: true }, // harga awal
  estimatedValue: { type: Number }, // estimasi nilai asli barang (opsional)
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
