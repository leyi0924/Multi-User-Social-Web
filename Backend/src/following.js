var Profile = require('./model.js').Profile


//done implemented
const getFollowing = (req, res) => {
    let currName = req.params.user
    Profile.find().exec(function(err, items) {
        let currUser = items.filter(x => x.username === currName)
        let following = currUser[0].following
        res.send({username: currName, following: following})
    })
}

function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

//implemented
async function getFollowingInfo(req, res) {
    let info=[]
    let currName = req.params.user
    Profile.find().exec(async function(err, items) {
        let currUser = items.filter(x => x.username === currName)
        let following = currUser[0].following

        await following.forEach(async function(element){
            Profile.find().exec(async function(err, items) {
                let result = items.filter(x => x.username === element)
                let status=result[0].status;
                let avatar=result[0].avatar;
                info.push({
                    "image": avatar,
                    "name": element,
                    "status":status
                })
            })
        })
    })
    await delay();
    // console.log(info)
    res.send(info)

}

//done implemented
async function putFollowing (req, res){
    let info=[]
    let currUsername = req.username
    let addName = req.params.user
    Profile.find().exec(async function(err, items) {
        let currUser = items.filter(x => x.username === currUsername)
        let following = currUser[0].following

        Profile.findOneAndUpdate({username: currUsername} , {$push:{following: addName}}, function () {});

        await following.forEach(async function(element){
            Profile.find().exec(async function(err, items) {
                let result = items.filter(x => x.username === element)
                let status=result[0].status;
                let avatar=result[0].avatar;
                info.push({
                    "image": avatar,
                    "name": element,
                    "status":status
                })
            })
        })
    })
    await delay();
    // console.log(info)
    res.send(info)
}


//done implemented
async function deleteFollowing (req, res) {
    let info=[]
    let currUsername = req.username
    let deleteName = req.params.user
    Profile.find().exec(async function(err, items) {
        let currUser = items.filter(x => x.username === currUsername)
        let following = currUser[0].following
        Profile.update({username: currUsername} , {$pull:{following: deleteName}}, function () {});

        await following.forEach(async function(element){
            Profile.find().exec(async function(err, items) {
                let result = items.filter(x => x.username === element)
                let status=result[0].status;
                let avatar=result[0].avatar;
                info.push({
                    "image": avatar,
                    "name": element,
                    "status":status
                })
            })
        })
    })
    await delay();
    // console.log(info)
    res.send(info)
}

async function allRegistered (req, res) {
    let info=[]
    // let currUsername = req.username
    // let deleteName = req.params.user
    Profile.find().exec(async function(err, items) {
        // let currUser = items.filter(x => x.username === currUsername)
        // let following = currUser[0].following
        // Profile.update({username: currUsername} , {$pull:{following: deleteName}}, function () {});

        await items.forEach(async function(element){
            let status=element.status;
            let avatar=element.avatar;
            let name=element.username;
            info.push({
                "image": avatar,
                "name": name,
                "status":status
            })
        })
    })
    await delay();
    // console.log(info)
    res.send(info)
}


module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
    app.get('/followingInfo/:user', getFollowingInfo)
    app.get('/registered', allRegistered)
}