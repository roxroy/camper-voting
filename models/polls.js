const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  name: String,
  linkCode: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [
    { 
      choice: String,
      clicks: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
});

pollSchema.pre('save', (next) => {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

module.exports = mongoose.model('Poll', pollSchema);
