// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
})

var articleSchema = new mongoose.Schema({
	_id: Number, author: String, img: String, date: String, text: String,
	comments: [ commentSchema ]
})

var usersSchema = new mongoose.Schema({
	username: String, salt: String, hash: String, authId:String, auth: [String], linked:Boolean, thirdParty:Boolean
})

var profilesSchema = new mongoose.Schema({
	username: String,
	status: String,
    following: [ String ],
    email: String,
    dob: String,
    zipcode: String,
	phone: String,
    avatar: String    
})

exports.Article = mongoose.model('article', articleSchema)
exports.User = mongoose.model('user', usersSchema)
exports.Profile = mongoose.model('profile', profilesSchema)

