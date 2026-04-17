const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  businessName: String,
  industry: String,
  description: String,
  targetMarket: String,
  problemSolving: String,
  uniqueValue: String,
  businessModel: String,
  funding: String,
  timeline: String,
  experience: String,

  score: Number,

  status: {
    type: String,
    enum: ["Validated", "In Progress", "Rejected"],
    default: "In Progress",
  },

  result: {
      type: Object,
      required: true,
    },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true } 

);

module.exports = mongoose.model("Idea", ideaSchema);