const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const studentSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  faname: String,
  mname: String,
  email: String,
  password: String,
  dob: String,
  dues:Number,
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

const slipSchema=new mongoose.Schema({
  name:String,
  rollno:String,
  class:Number,
  tufee:Number,
  hfee:Number,
  trfee:Number,
  issueDate:String,
  dueDate:String
})
const slipModel=mongoose.model('Slip',slipSchema)
module.exports = {
  Student,ReviewsModel,RemindersModel
,slipModel
};
