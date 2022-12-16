const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  Name:{type:String,required:true},
  number:{type:String,required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const model = mongoose.model("Admin", adminSchema);

module.exports = model;
