const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define a person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manger", "owner"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// personSchema.pre("save", async function (next) {
//   const person = this;
//   if (!person.isModified("password")) return next();

//   try {
    
//   } catch (error) {
    
//   }
// });

// Create person models
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
