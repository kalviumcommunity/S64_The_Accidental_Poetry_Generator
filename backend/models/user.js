const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    
    console.log("🔍 Hashing password for:", this.email);
    this.password = await bcrypt.hash(this.password, 10);
    console.log("✅ Password hashed successfully");
    
    next();
  } catch (error) {
    console.error("❌ Error in password hashing:", error);
    next(error);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("❌ Error comparing passwords:", error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
