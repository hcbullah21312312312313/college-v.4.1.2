const mongoose=require('mongoose')
const applicationSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    fatherName:String,
    matherName:String,
    email:String,
    age:String,
    gender:String,
    about:String,
    dob:String,
    address:String,
    education:String,
    lastinstitution:String,
    yearsstudied:String,
    whyyouleft:String,
    lastdegree:String,
    percentageinlastdegree:String,
    profilePicture:String
})
module.exports=mongoose.model('application',applicationSchema)