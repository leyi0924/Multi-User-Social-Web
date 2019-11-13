
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')()

// const putPassword = (req, res) => {
//      res.send({ username: 'loggedInUser', result: 'success' })
// }

const app = express();

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Credentials",true);
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Request-With, X-Session-Id");
     res.header("Access-Control-Allow-Origin", req.headers.origin);
     res.header("Access-Control-Expose-Headers", "Location, X-Session-Id")
     if(req.method === 'OPTIONS') {
          res.status(200).send('OK')
     } else (
         next()
     )
});

app.use(bodyParser.json());
app.use(cookieParser);

// console.log('index')
// require('./uploadCloudinary.js')
require('./src/auth')(app)
require('./src/profile')(app)
require('./src/following')(app)
require('./src/articles')(app)
// app.get('/password', putPassword)



// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})


