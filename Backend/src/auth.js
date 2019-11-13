var User = require('./model.js').User
var Profile = require('./model.js').Profile
var Article = require('./model.js').Article
const md5=require('md5');
var session = require('express-session')
var passport=require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;


const sessionUser = {}
var cookieKey = 'sid'
function isLoggedIn(req,res,next){
    var sid = req.cookies[cookieKey]
    // console.log(req.thirdparty)
    // console.log(req.user.thirdParty)
    var username = sessionUser[sid]
    if(!username){
        if (req.isAuthenticated()){
            console.log("FB")
            req.username = req.user.username
            next()
            return
        } else {
            return res.sendStatus(401)
        }

    }


    // redis.hgetall('sessions',function(err,object){

    // });
    if(username){
        req.username = username
        next()
    }
    else{
        res.sendStatus(401)
    }

}

//done implemented
const postLogin = (req, res) => {
    var username=req.body.username;
    var password=req.body.password;
    User.find().exec(function(err, items) {
        let currUser=items.filter(x => x.username===username)
        // redis.hmset('sessions',sid,JSON.stringify(currUser));
        // console.log(currUser)
        if (currUser.length==0) {
            res.sendStatus(404)
            return
        }
        let salt = currUser[0].salt
        let hash = currUser[0].hash
        let correctPass = md5(password+salt)
        if(hash===correctPass){
            const sessionKey = md5("Haha" + new Date().getTime() + username)
            sessionUser[sessionKey] = currUser[0].username
            res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true})
            res.send({ username: username, result: "success"})
        }
        else{
            res.sendStatus(404)
        }

    })
}

//done implemented
const putLogout = (req, res) => {
    var sid = req.cookies[cookieKey]
    delete sessionUser[sid]
    res.clearCookie(cookieKey)
    res.clearCookie("LoginName")
    res.status(200).send({status: "OK"})
}

//done implemented
const postRegister = (req, res) => {
    var username = req.body.username
    var email = req.body.email
    var dob = req.body.dob
    var zipcode = req.body.zipcode
    var password = req.body.password
    let newProfile = { username: username, status: '', following: [], email: email, dob: dob, zipcode: zipcode, avatar: ''}
    new Profile(newProfile).save()
    new User({ username: username, salt: 'ddd', hash: md5(password + 'ddd') }).save()
    res.send({ result: 'success', username: username})
}

//done
const putPassword = (req, res) => {
    let logUser=req.username
    let newPwd=req.body.password
    User.find().exec(function(err, items) {
        let currUser = items.filter(x => x.username === logUser)
        let salt=currUser[0].salt
        User.findOneAndUpdate({username: logUser} , {$set:{hash: md5(newPwd + salt)}})
        res.send({ username: 'loggedInUser', result: 'success' })
    })
}

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    // console.log("deserialized")
    User.find().exec(function(err, items) {
        let currUser = items.filter(x => x.authId === id)
        done(null,currUser[0])
    })
})

const config = {
    clientID: '277398899856887',
    clientSecret: '0b4552afe42339c776ca80f5ba3f3486',
    //https://secret-thicket-16343.herokuapp.com/callback
    callbackURL: "https://secret-thicket-16343.herokuapp.com/callback",
    passReqToCallback:true
}

passport.use(new FacebookStrategy(config,
    function(req, token, refreshToken, profile, done){
        process.nextTick(function(){
            let logId = profile.id
            let display = profile.displayName+'viaFB'
            var sid = req.cookies[cookieKey]
            var username = sessionUser[sid]
            if (username) {
                // find current accounts
                User.find().exec(function(err, items) {
                    let authUser = items.filter(x => x.authId === logId)
                    if(authUser.length!=0){
                        let authUserAuth=["FB"]
                        User.findOneAndUpdate({username: username} , {$set:{authId:logId,auth: authUserAuth,linked:true, thirdParty:false}},
                            ()=>{
                                Profile.find().exec(function(err, items) {
                                    let authProfile = items.filter(x => x.username === display)
                                    let authProfileFollowing=authProfile[0].following
                                    Profile.find().exec(function(err, items) {
                                        let currProfile = items.filter(x => x.username === username)
                                        let currFollowing=currProfile[0].following
                                        let a = currFollowing.concat(authProfileFollowing.filter(function (item) {
                                            return currFollowing.indexOf(item) < 0;
                                        }))
                                        Profile.findOneAndUpdate({username: username} , {$set:{following:a}},
                                            ()=>{
                                                Article.updateMany({author: display} , {$set:{author:username}},
                                                    ()=>{
                                                        Article.updateMany({"comments.author": display} , {$set:{"comments.$.author":username}},
                                                            ()=>{
                                                            Profile.deleteMany({ username : display },
                                                                ()=>{
                                                                User.deleteMany({ username : display },
                                                                    ()=>{
                                                                        req.authUser=username
                                                                        return done(null,profile)

                                                                    })

                                                                })
                                                            })
                                                })
                                            })
                                    })
                                })
                        })
                    }else {
                        let authUserAuth=["FB"]
                        User.findOneAndUpdate({username: username} , {$set:{authId:logId,auth: authUserAuth,linked:true, thirdParty:false}},
                            ()=>{
                                req.authUser=username
                                return done(null,profile)
                            })
                    }
                })
            }
                // merge following list (profile)
                // change authId, auth (user)
                // change article name
                // change comment name
                // delete FB profile, user
                // return
            else {
                User.find().exec(function(err, items) {
                    let currUser = items.filter(x => x.authId === logId)
                    if(currUser.length==1){
                        req.authUser=currUser[0].username
                        const sessionKey = md5("Haha" + new Date().getTime() + username)
                        sessionUser[sessionKey] = currUser[0].username

                        return done(null,profile)
                    }
                    else{
                        new User({ username: display, salt: null, hash: null, authId:logId, auth: ['FB'],linked:false, thirdParty:true}).save(()=>{
                            new Profile({ username: display, status: 'Default', following: [], email: 'default@example.com', dob: '2000-01-01', zipcode: '00000', avatar: ''}).save(()=>{
                                req.authUser=display
                                return done(null,profile)
                            })
                        })
                    }
                })
            }
        })
    })
)

const linkNormalAccount= (req, res) => {
    let username=req.username
    let display = req.body.username
    User.find().exec(function(err, items) {
        let authUserList = items.filter(x => x.username === display)
        let logId = authUserList[0].authId
        console.log(authUserList[0])
        User.find().exec(function(err, items) {
            let authUser = items.filter(x => x.authId === logId)
            let authUserAuth=authUser[0].auth
            console.log(logId)
            User.findOneAndUpdate({username: username} , {$set:{authId:logId,auth: authUserAuth,linked:true, thirdParty:false}},
                    ()=>{
                        Profile.find().exec(function(err, items) {
                            let authProfile = items.filter(x => x.username === display)
                            let authProfileFollowing=authProfile[0].following
                            Profile.find().exec(function(err, items) {
                                let currProfile = items.filter(x => x.username === username)
                                let currFollowing=currProfile[0].following
                                let a = currFollowing.concat(authProfileFollowing.filter(function (item) {
                                    return currFollowing.indexOf(item) < 0;
                                }))
                                Profile.findOneAndUpdate({username: username} , {$set:{following:a}},
                                    ()=>{
                                        Article.updateMany({author: display} , {$set:{author:username}},
                                            ()=>{
                                                Article.updateMany({"comments.author": display} , {$set:{"comments.$.author":username}},
                                                    ()=>{
                                                        Profile.deleteMany({ username : display },
                                                            ()=>{
                                                                User.deleteMany({ username : display },
                                                                    ()=>{
                                                                        res.cookie("LoginName", username, { maxAge: 3600*1000, httpOnly: false})
                                                                        res.send({result:"success"})
                                                                    })

                                                            })
                                                    })
                                            })
                                    })
                            })
                        })
                    })
            })

    })

    // link account
    // find to link local accounts
    // merge following list (profile)
    // change authId, auth (user)
    // change article name
    // change comment name
    // delete FB profile, user
    // sessionID
    // redirect
}

const unlink = (req, res) => {
    let username=req.username
    req.logout()
    for (var e in sessionUser) {
        res.cookie(cookieKey, e, { maxAge: 3600*1000, httpOnly: true})
    }
    User.findOneAndUpdate({username: username} , {$set:{authId:'',auth: [],linked:false, thirdParty:false}},
        ()=>{
        res.send({result:'Successfully Unlink'})
        })
    // unlink
    // req.logout()
    // change auth, authID
}


const successDirect = (req, res) => {
    // console.log('success')
    // cookie
    res.cookie("LoginName", req.authUser, { maxAge: 3600*1000, httpOnly: false})
    req.thirdparty = true
    //redirect
    //https://precious-reaction.surge.sh/#/main
    res.redirect("https://precious-reaction.surge.sh/#/main;LoginName="+req.authUser)
}

const getUser = (req, res) => {
    let logUser = req.username
    User.find().exec(function(err, items) {
        let allusers=items.filter(x => x.username === logUser)
        res.send(allusers)

    })
}

module.exports = app => {
    app.use(session({secret:"my secret"}))
    app.use(passport.initialize())
    app.use(passport.session())

    app.post('/login', postLogin)
    app.post('/register', postRegister)
    app.use('/FBlogin', passport.authenticate('facebook',{scope:'email'}))
    app.use('/callback',passport.authenticate('facebook',{
        failureRedirect:'/fail'}),successDirect)
    app.use(isLoggedIn)
    app.put('/password', putPassword)
    app.put('/logout', putLogout)
    app.put('/linkNormal',linkNormalAccount)
    app.put('/unlink',unlink)
    app.get('/allusers',getUser)

}

