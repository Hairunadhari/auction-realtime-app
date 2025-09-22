const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['user', 'admin'], default: 'user' },
    active:     { type: Number, enum: [0, 1], default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
