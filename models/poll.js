const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  _id: {
      type: String,
      'default': shortid.generate
  },
  ownerUserId: String,
  title: String,
  answers: [
    { 
      choiceId: String,
      choice: String,
      clicks: Number
    }
  ],
  votersUserIds: [],
  votersIps: [],
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