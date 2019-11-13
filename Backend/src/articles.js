var Article = require('./model.js').Article
var Profile = require('./model.js').Profile
const uploadImage = require('./uploadCloudinary')


//done implemented last time and renewed
const getArticles = (req, res) => {
    let ID=req.params.id
    if (!ID) {
        let currUser = req.username
        // console.log(currUser)
        Profile.find().exec(function(err, items) {
            let curUserInfo = items.filter(x => x.username === currUser)
            let curFollowing = curUserInfo[0].following
            curFollowing.push(currUser)
            Article.find({author:{$in:curFollowing}}).sort({date:-1}).limit(10).exec(function (err, items) {
                // console.log(items)
                res.send({articles: items})
            })
        })
    }
    else {
        Article.find().exec(function(err, items) {
            let requestedArticle=items.filter(x => x.author===ID)
            if (requestedArticle.length == 0){
                requestedArticle=items.filter(x => x._id===parseInt(ID))
            }
            res.send({articles: requestedArticle})
        })

    }
}

//done implemented
const putArticles = (req, res) => {
    let payload = req.body
    let payloadText=req.body.text
    let postId=req.params.id
    let logUser=req.username
    const today = new Date()
    // let payloadList = payload.split(',')
    if (!payload.commentId){//edit article
        Article.find().exec(function(err, items) {
            console.log(postId)
            let reqArticle = items.filter(x => x._id === parseInt(postId))
            if(reqArticle[0].author===logUser){//edit
                Article.update({_id: postId} , {$set:{text:payloadText},date:(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()},
                    function () {
                        Article.find().exec(function(err, items) {
                            let updated = items.filter(x => x._id === postId)
                            res.send({articles:updated})
                        })
                    })

            }
            else{//not own the article
                res.send('user does not own the article')
            }
        })

    }
    else{//update comment
        if(payload.commentId===-1){//add new comment
            let newComment = {commentId: new Date().getTime(), author: logUser, date: (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear(), text: payloadText}
            Article.update({_id: postId} , {$push:{comments:newComment}}, (err, items) => {
                Article.find().exec(function(err, items) {
                    let updated = items.filter(x => x._id === postId)
                    res.send({articles:updated})
                })
            })

        }
        else{//edit comment

            Article.find({_id:postId}).exec(function (err, items) {
                // console.log(items)
                let comments = items[0].comments
                let curCmt = comments.filter(x => x.commentId == payload.commentId)
                // console.log(curCmt)
                if (curCmt[0].author===logUser){
                    Article.update({_id:postId,"comments.commentId":payload.commentId} ,
                        {$set:{"comments.$.text":payloadText,"comments.$.date":(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()}},
                        function () {
                            Article.find().exec(function(err, items) {
                                let updated = items.filter(x => x._id === postId)
                                res.send({articles:updated})
                            })
                        })

                }
                else {//not own comment
                    res.send('user does not own the comment')
                }
            })

        }
    }

}

//done implemented
const postArticle = (req, res) => {
    let payload = req.body.text
    let url = req.body.image
    let currUser = req.username
    console.log(payload)
    console.log(url)
    let today = new Date()
    let newArticle = {  _id: today.getTime(), author: currUser, img: url , date: (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear(),  text: payload, comments: []}
    new Article(newArticle).save(()=>{
        Article.find().exec(function (err, items) {
            let allArticles = []
            items.forEach(function(item) {
                allArticles.push(item)
            })
            res.send({articles:allArticles})
        })
    })

}

//done implemented
const allArticles = (req, res) => {
    Article.find().exec(function(err, items) {
        res.send(items)
    })

}

const putPic=(req,res) => {
    let logUser=req.username
    let url=req.fileurl
    res.send({username: logUser , pic: url})
}


module.exports = app => {
    app.get('/articles/:id?', getArticles)
    app.put('/articles/:id?',  putArticles)
    app.post('/article',  postArticle)
    app.get('/all', allArticles)
    app.put('/articlePic', uploadImage('image'), putPic)
}