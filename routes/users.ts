import * as express from 'express';
import User from "../app/models/user";
const jwt = require("jsonwebtoken");

let router = express.Router();
let secret = "secretTest";

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find().then((users) => {
    res.json(users);
  })
});

//http://localhost:3000/api/users
// USER REGISTRATION ROUTE //
router.post("/", (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  if(req.body.name === undefined || req.body.name === "" || req.body.username === undefined || req.body.username === "" || req.body.password === undefined || req.body.password === "" || req.body.email === undefined || req.body.email === ""
  ) {
    res.json({success: false, message: "Ensure username, email, and password were provided"})
  } else {
    user.save().then((data) => {
      res.json({success: true, message: "User created"});
    }).catch((err) => {
      res.json({success: false, message: "Username or email already exists!"});
    });
  }
});
// USER LOGIN ROUTE //
//http://localhost:3000/api/users/authenticate
router.post("/authenticate", (req, res) => {
  User.findOne({username: req.body.username}).select("name email username password").then((user) => {
    if(!user) {
      if(!res.headersSent)
      res.json({success: false, message: "Could not authenticate user"});
    } else if(user) {
      if(req.body.password) {
      if(!res.headersSent)
      var validPassword = user.comparePassword(req.body.password);
    } else {
      res.json({success: false, message: "No password provided"});
    }
      if(!validPassword) {
        if(!res.headersSent)
        res.json({success: false, message: "could not authenticate password"});
      } else if(validPassword) {
        if(!res.headersSent) {
          let token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: "24h"});
          res.json({success: true, message: "User authenticated", token: token});
        }
      }
    }
  }).catch((err) => {
    res.sendStatus(404);
  });
});

router.use((req, res, next) => {
  //Get token from request: req.body.token;
  //Get token from url: req.body.query;
  //get token from headers: req.headers["x-access-token"]
  let token = req.body.token || req.body.query || req.headers["x-access-token"];
  if(token) {
    //Verify token
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        res.json({success: false, message: "Token invalid"});
      } else {
        req["decoded"] = decoded;
        next();
      }
    });
  } else {
    res.json({success: false, message: "No token provided"});
  }
});

//http://localhost:3000/api/users/current
router.post("/current", (req, res) => {
  res.send(req["decoded"]);
})




export default router;
