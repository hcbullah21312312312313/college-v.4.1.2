const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const studentSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  dob: String,
  address: String,
  gender: String,
  age: String,
  lastinstitution: String,
  rollno: Number,
  class: String,
  Sphone: String,
  guardianPhone: String,
  emergencyContactName: String,
  emergencyContactPhone: String,
  profilePicture: String,
});

// Add passport-local-mongoose plugin
studentSchema.plugin(passportLocalMongoose);

const Student = mongoose.model('Student', studentSchema);

const reviewsSchema = new mongoose.Schema({
    name: String,
    department: String,
    review: String
  })
const ReviewsModel = mongoose.model('reviews', reviewsSchema)

const reminderSchema = new mongoose.Schema({
    name: String,
    rollno: Number,
    message: String,
    date: String,
    tfee: String,
    hfee: String,
    mfee: String,
    trfee: String,
  
  })
const RemindersModel = mongoose.model('reminders', reminderSchema)

module.exports = {
  Student,ReviewsModel,RemindersModel
};
