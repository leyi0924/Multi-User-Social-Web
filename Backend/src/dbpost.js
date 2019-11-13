// this is dbarticle.js 
var Article = require('./model.js').Article
var User = require('./model.js').User
var Profile = require('./model.js').Profile
const md5 = require('md5')

new Article({ _id: 1, author: 'John', img: 'http://houmuse.org/wp-content/uploads/2015/04/exp43.jpg' , date: '10/24/2018', 
               text: 'These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 2, author: 'John', img: '' , date: '03/22/2018', 
               text: 'Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. ed ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 3, author: 'John', img: 'http://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1544129684/photos/286950_original.jpg' , date: '01/22/2017', 
               text: 'This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 4, author: 'John', img: 'https://www.khou.com/img/resize/content.khou.com/photo/2016/03/01/635924504441219992-Berani-Outside-0003-5640_853214_ver1.0.jpg?mode=pad&bgcolor=000000&scale=both&width=1140&height=641' , date: '11/22/2016', 
               text: 'This is a tiger. This is a tiger. This is a tiger. This is a tiger. This is a tiger. This is a tiger. This is a tiger. This is a tiger. This is a tiger.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 5, author: 'John', img: '' , date: '08/22/2016', 
               text: 'Sigh view am high neat half to what. Sent late held than set why wife our. If an blessing building steepest. Agreement distrusts mrs six affection satisfied. Day blushes visitor end company old prevent chapter. Consider declared out expenses her concerns. No at indulgence conviction particular unsatiable boisterous discretion. Direct enough off others say eldest may exeter she. Possible all ignorant supplied get settling marriage recurred.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 6, author: 'Peter', img: '' , date: '03/22/2015', 
               text: 'Yourself off its pleasant ecstatic now law. Ye their mirth seems of songs. Prospect out bed contempt separate. Her inquietude our shy yet sentiments collecting. Cottage fat beloved himself arrived old. Grave widow hours among him ﻿no you led. Power had these met least nor young. Yet match drift wrong his our.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 7, author: 'Lucy', img: '' , date: '09/24/2014', 
               text: 'Attention he extremity unwilling on otherwise. Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off. Left did fond drew fat head poor. So if he into shot half many long. China fully him every fat was world grave. ',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()
new Article({ _id: 8, author: 'Lucy', img: 'https://media.glassdoor.com/l/c7/cc/12/7e/baby-giraffe-born-at-the-houston-zoo.jpg' , date: '03/22/2014', 
               text: 'Prospect out bed contempt separate. Her inquietude our shy yet sentiments collecting. Cottage fat beloved himself arrived old. Grave widow hours among him ﻿no you led. Power had these met least nor young. Yet match drift wrong his our. Left did fond drew fat head poor. So if he into shot half many long. China fully him every fat was world grave.',
               comments: [{commentId: 1, author: 'John', date: '1900/01/01', text: 'Hello'},{commentId: 2, author: 'John', date: '1900/01/01', text: 'Hello'}] }).save()


new User({ username: "John", salt: "aaa", hash: md5("123456aaa"), authId:'', auth: [],linked:false, thirdParty:false}).save()
new User({ username: "Peter", salt: "bbb", hash: md5("222222bbb") , authId:'', auth: [],linked:false, thirdParty:false}).save()
new User({ username: "Lucy", salt: "ccc", hash: md5("888888ccc") , authId:'', auth:[],linked:false, thirdParty:false}).save()

new Profile({ username: 'John', status: "Today it's rainy", following: [ 'Peter','Lucy' ], email: 'example@ex.com', dob: '1900-01-01', zipcode: '12345', phone: "123-123-1234", avatar: 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'}).save()
new Profile({ username: 'Peter', status: "Today it's sunny!", following: [ 'John','Lucy' ], email: '123@gmail.com', dob: '1960-02-03', zipcode: '00000', phone: "321-321-4321", avatar: 'http://www.laia-amela.com/wp-content/uploads/2016/10/avatar-number-1.jpg'}).save()
new Profile({ username: 'Lucy', status: "Today it's foggy!", following: [ 'John','Peter' ], email: 'hi@hotmail.com', dob: '1996-05-01', zipcode: '54321', phone: "909-123-1234", avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'}).save()
