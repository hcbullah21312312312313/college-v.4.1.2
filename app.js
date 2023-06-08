//jshint ESversion 6
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const multer = require('multer')
const path = require('path');
const fs = require('fs')
const ApplicationModel = require('./module/applicationSchema.js')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Setting multer up 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
// All about setting multer up

//Passport
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
const StudentsModel = require('./module/mongooseConnect.js')

//pssport setup intialization
app.get('/', (req, res) =>
  res.render('index'))

app.get('/applyOnline', function (req, res) {
  res.render('apply')
})
// your mongoose schemas here and installing plugin to the main schema such as the one containing {username,password}

const newStudentSchema = new mongoose.Schema({
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
  profilePicture: String
});


//specificly passport setup
newStudentSchema.plugin(passportLocalMongoose);
//specificly passport setup

const Student = mongoose.model('newStudent', newStudentSchema);
passport.use(new LocalStrategy(Student.authenticate()));

passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());
app.post('/database/add/new', async function (req, res) {
  //specificly passport setup
  const dp = await ApplicationModel.find({ email: req.body.username })
  console.log(dp)
  const newStudent = new Student({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    address: req.body.address,
    gender: req.body.gender,
    age: req.body.age,
    lastinstitution: req.body.lastinstitution,
    rollno: req.body.rollno,
    class: req.body.class,
    Sphone: req.body.Sphone,
    guardianPhone: req.body.guardianPhone,
    emergencyContactName: req.body.emergencyContactName,
    emergencyContactPhone: req.body.emergencyContactPhone,
    about: req.body.about,

  });
  newStudent.save()
  Student.register(newStudent, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.render('add');

    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/login');
      });
    }
  });
  //specificly passport setup
})
app.post('/applyOnline', upload.single('profilePicture'), async function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const fatherName = req.body.father;
  const motherName = req.body.mother;
  const email = req.body.email;
  const address = req.body.address;
  const age = req.body.cars;
  const gender = req.body.exist;
  const dob = req.body.birthday;
  const lastinstitution = req.body.lastinstitution;
  const yearsstudied = req.body.yearsstudied;
  const whyyouleft = req.body.whyyouleft;
  const lastdegree = req.body.lastdegree;
  const lastpercentage = req.body.lastpercentage;
  const about = req.body.about;
  console.log(req.body.profilePicture)
  const newApplication = new ApplicationModel({
    fname: fname,
    lname: lname,
    fatherName: fatherName,
    matherName: motherName,
    email: email,
    age: age,
    gender: gender,
    about: about,
    dob: dob,
    address: address,
    lastinstitution: lastinstitution,
    yearsstudied: yearsstudied,
    whyyouleft: whyyouleft,
    lastdegree: lastdegree,
    percentageinlastdegree: lastpercentage,
    profilePicture: req.file.filename

  });

  newApplication.save().then(() => (console.log('file uploaded')))
  res.send("Your Application has been filed succefully Yo'l be notified once your application get approved")
})
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
//Not yet programmed

app.get('/database/teacher/:teachersid', async function (req, res) {
  const teachersid = req.params.id;
  console.log(teachersid)
  res.render('/teacher-dashboard')
})

//Not yet programmed
//Not yet programmed
const RemindersModel = mongoose.model('reminders', reminderSchema)
app.get('/pay/bills', async function (req, res) {
  res.render('bills')
})
//Not yet programmed

app.get('/login', function (req, res) {
  res.render('login')
})
app.get('/signUp', function (req, res) {
  res.render('signup')
})

app.get('/search/result', async function (req, res) {
  res.render('searchresult')
})
var searchResult = null;
app.post('/search/result', async function (req, res) {
  const rollno = req.body.rollno
  const StudentName = req.body.name
  searchResult = (await StudentsModel.find({
    rollno: rollno
  }))
  res.redirect('/results')
})
//Not yet programmed

app.get('/admin/database/:post', async function (req, res) {
  const post = req.params.post;
  console.log(post)
})
//Not yet programmed

app.get('/results', async function (req, res) {
  console.log(searchResult)
  res.render('results', { results: searchResult })
})

app.get('/admin', async function (req, res) {
  const applications = await ApplicationModel.find({})
  res.render('admin', { applications: applications })
})

app.get('/database', async function (req, res) {
  res.render('database', { data: await StudentsModel.find({}) })
})
app.get('/transactions', async function (req, res) {
  res.render('transactions')
})
app.get('/studentPortal', async function (req, res) {
  res.render('studentPortal')
})
app.get('/admin/application/appId/:id', async function (req, res) {
  const id = req.params.id
  const application = await ApplicationModel.find({ _id: id })
  res.render('application', { application: application })
})
app.get('/admin/database/transactions', async function (req, res) {
  res.render('transactions')
})
app.get('/admin/transactions/appId/:id', async function (req, res) {
  const id = req.params.id
  const transactions = await transactions.find({ _id: id })
  res.render('transactions', { transactions: transactions })
})
app.get('/academics', function (req, res) {
  res.render('academics')
})
app.get('/students/reviews', async function (req, res) {
  const data = await ReviewsModel.find({})
  res.render('reviews', { reviews: data })
})
app.post('/database/postReviews', function (req, res) {
  const name = req.body.name
  const department = req.body.field
  const review = req.body.review
  const newReview = new ReviewsModel({
    name: name,
    department: department,
    review: review
  })
  newReview.save().then(() => {
    res.redirect('/students/reviews')
  })
})
app.get('/database/add', function (req, res) {
  res.render('add')
})
app.get('/sendReminder', function (req, res) {
  res.render('sendReminder')
})
app.post('/sendReminder', function (req, res) {
  const sendReminder = new RemindersModel({
    name: req.body.name,
    rollno: req.body.rollno,
    message: req.body.message,
    date: req.body.date,
    tfee: req.body.tfee,
    hfee: req.body.hfee,
    mfee: req.body.mfee,
    trfee: req.body.trfee
  })
  sendReminder.save().then(() => {
    res.send("Reminder send suuccefully!");
  })
})

app.get('/login', function (req, res) {
  res.render('login')
})
app.post('/login',
  passport.authenticate('local', {
    //specificly passport setup
    successRedirect: '/target',
    failureRedirect: '/login'
    //specificly passport setup

  }),
);
app.get('/target', async function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }

  const username = req.user.username;
  console.log(username);

  const data = await Student.find({ username: username });
  var Varstudent = null;
  data.forEach(function (student) {
    Varstudent = student
  })
  console.log(data);

  res.render('dashboard', { data: Varstudent });
});
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
)



