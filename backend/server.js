require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const PORT = process.env.PORT || 5000;

// 🔹 bikin http server dari express app
const server = createServer(app);

// 🔹 tempel socket.io ke server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // alamat React client
    methods: ["GET", "POST"],
  },
});

// ========================
// 🔹 Auction State Global
// ========================
let currentBid = 0; // harga awal
let timer = 180; // 3 menit
let countdown;

// fungsi start auction
function startAuction() {
  timer = 1800;
  currentBid = 0;

  if (countdown) clearInterval(countdown);

  countdown = setInterval(() => {
    timer--;
    io.emit("timeLeft", timer);

    if (timer <= 0) {
      clearInterval(countdown);
      io.emit("auctionEnded", { winnerBid: currentBid });
    }
  }, 1000);
}

// ========================
// 🔹 Socket Events
// ========================
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // kirim kondisi awal
  socket.emit("currentBid", { user: "system", amount: currentBid });
  socket.emit("timeLeft", timer);

  // terima bid
  socket.on("placeBid", ({ user, amount }) => {
    if (amount > currentBid && timer > 0) {
      currentBid = amount;
      io.emit("currentBid", { user, amount });
    } else {
      socket.emit(
        "bidError",
        "❌ Bid harus lebih tinggi atau waktu sudah habis!"
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ========================
// 🔹 Koneksi database
// ========================
connectDB();

// 🔹 Jalankan server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  startAuction(); // langsung mulai auction saat server nyala
});
