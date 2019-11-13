var Profile = require('./model.js').Profile
const uploadImage = require('./uploadCloudinary')


//done implemented
const getHeadlines = (req, res) => {

    let users = req.params.users
    let userList = users.split(',')
    let headlines = []
    // console.log(users)

    Profile.find().exec(function(err, items) {
        for(let i=0;i<userList.length;i++) {
            let currName = userList[i]
            let currUser = items.filter(x => x.username === currName)
            let headline = currUser[0].status
            headlines.push({username: currName, headline: headline})
        }
        res.send({headlines: headlines})
    })
}

//done implemented
const putHeadline = (req, res) => {
    let currUser = req.username
    let newHeadline = req.body.headline
    Profile.findOneAndUpdate({username: currUser} , {$set:{status: newHeadline}},
        ()=>{
            res.send({username: currUser , headline: newHeadline })
        })
}

//done implemented
const getEmail=(req,res) => {
    let reqUser=req.params.user
    Profile.find().exec(function(err, items) {
        let filtered=items.filter(x => x.username === reqUser)
        let email=filtered[0].email
        res.send({ username: reqUser, email: email})
    })
}

//done implemented
const putEmail=(req,res) => {
    let newEmail=req.body.email
    let curUser=req.username
    Profile.findOneAndUpdate({username: curUser} , {$set:{email: newEmail}}, function () {})
    res.send({username: curUser , email: newEmail})
}

//done implemented
const getDOB=(req,res) => {
    let reqUser=req.params.user
    Profile.find().exec(function(err, items) {
        let filtered=items.filter(x => x.username === reqUser)
        let DOB=filtered[0].dob
        let dobMill = DOB.getTime()
        res.send({ username: reqUser, dob: dobMill})
    })
}

//done implemented
const getZipcode=(req,res) => {
    let reqUser=req.params.user
    Profile.find().exec(function(err, items) {
        let filtered=items.filter(x => x.username === reqUser)
        let zip=filtered[0].zipcode
        res.send({ username: reqUser, zipcode: zip})
    })
}

//done
const putZipcode=(req,res) => {
    let newZip=req.body.zipcode
    let curUser=req.username
    Profile.findOneAndUpdate({username: curUser} , {$set:{zipcode: newZip}}, function () {})
    res.send({username: curUser , zipcode: newZip})
}

//done implemented
const getAvatars=(req,res) => {
    let users = req.params.user
    let userList = users.split(',')
    let avatars = []

    Profile.find().exec(function(err, items) {
        for(let i=0;i<userList.length;i++) {
            let currName = userList[i]
            let currUser = items.filter(x => x.username === currName)
            let avatar= currUser[0].avatar
            avatars.push({username: currName, avatar: avatar})
        }
        res.send({avatars: avatars})
    })
}

//done
const putAvatar=(req,res) => {
    let logUser=req.username
    let url=req.fileurl
    Profile.findOneAndUpdate({username: logUser} , {$set:{avatar: url}}, function () {})
    res.send({username: logUser , avatar: url})
}

const getProfile=(req,res) =>{
    let logUser = req.username
    Profile.find().exec(function(err, items) {
        let userProfile=items.filter(x => x.username === logUser)
        res.send(userProfile)

    })
}

const putPhone=(req,res) => {
    let newPhone=req.body.phone
    let curUser=req.username
    Profile.findOneAndUpdate({username: curUser} , {$set:{phone: newPhone}}, function () {})
    res.send({username: curUser ,phone: newPhone})
}



module.exports = app => {
    app.get('/headlines/:users?', getHeadlines)
    app.put('/headline',putHeadline)
    app.get('email/:user?',getEmail)
    app.put('/email',putEmail)
    app.get('/dob',getDOB)
    app.put('/phone',putPhone)
    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)
    app.get('/avatars/:user?',getAvatars)
    app.put('/avatar', uploadImage('image'), putAvatar)
    app.get('/userProfile',getProfile)
}