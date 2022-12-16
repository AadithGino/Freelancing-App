const mongoose = require("mongoose");
const moment = require('moment')
const notesSchema = new mongoose.Schema({
  userid: { type: mongoose.SchemaTypes.ObjectId },
  title: { type: String },
  description: { type: String },
  freelancers:[],
  time: { type: String, default: moment().format() },
});

const model = mongoose.model("Notes", notesSchema);

module.exports = model;
