module.exports=function(){
    app.get('/applyOnline',function(req, res) {
    res.render('apply')
})
app.post('/applyOnline',upload.single('profilePicture'),async function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const fatherName=req.body.father;
    const motherName=req.body.mother;
    const email=req.body.email;
    const address=req.body.address;
    const age=req.body.cars;
    const gender=req.body.exist;
    const dob=req.body.birthday;
    const lastinstitution =req.body.lastinstitution;
    const yearsstudied=req.body.yearsstudied;
    const whyyouleft=req.body.whyyouleft;
    const lastdegree=req.body.lastdegree;
    const lastpercentage=req.body.lastpercentage;
    const about=req.body.about;
    console.log(req.body.profilePicture)
    const newApplication=new ApplicationModel({
        fname:fname,
    lname:lname,
    fatherName:fatherName,
    matherName:motherName,
    email:email,
    age:age,
    gender:gender,
    about:about,
    dob:dob,
    address:address,
    lastinstitution:lastinstitution,
    yearsstudied:yearsstudied,
    whyyouleft:whyyouleft,
    lastdegree:lastdegree,
    percentageinlastdegree:lastpercentage,
    profilePicture:req.file.filename

});

 newApplication.save().then(()=>(console.log('file uploaded')))
res.send("Your Application has been filed succefully Yo'l be notified once your application get approved")
})
}