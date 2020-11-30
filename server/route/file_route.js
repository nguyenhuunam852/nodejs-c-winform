let express = require('express');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require("path");
const app = express.Router();

var multer  = require('multer')

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let math = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/xml"];
    if (math.indexOf(file.mimetype) < 2 ) {
      callback(null, path.join(`${__dirname}/../../uploads/docs`));
    }
    else
    {
      callback(null, path.join(`${__dirname}/../../uploads/publickeys`));
    }
  },
  filename: (req, file, callback) => {
    let math = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/xml"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
   
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
})
var upload = multer({ storage: storage })


app.post('/api/postfile', upload.array('files', 2),function (req, res, next) {
  let filecontroller = require('../controller/file_controller');
  filecontroller.insertOne(req.files[0].originalname,req.files[1].originalname,req.body.iduser).then(data=>{
    console.log('Done');
    res.status(200).send("upload complete");      

  }).catch((e)=>{
    console.log(e)
    res.status(400).send("fail");      

  })                
})

app.post('/api/listfile',jsonParser,urlencodedParser,function (req, res, next) {
    let tokencontroller = require('../controller/token_controller');
    console.log(req.body.token)
    tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let file_controller = require('../controller/file_controller');
        file_controller.getlistFile(data.id).then(data=>{
            console.log(data)
            res.status(200).send(data.splice(0,5));      

        }).catch((e)=>{
            console.log(e)
            res.status(400).send("fail");      
          })   
    }).catch((e)=>{
        console.log(e)
        res.status(400).send("fail");      
    })           
  })

app.post('/api/listuser',jsonParser,urlencodedParser,function (req, res, next) {
    let tokencontroller = require('../controller/token_controller');
    tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let file_controller = require('../controller/file_controller');
        file_controller.getlistuser(req.body.idfile).then(data=>{
            console.log(data)
            res.status(200).send(data);      
        }).catch((e)=>{
            res.status(400).send("fail");      
          })   
    }).catch((e)=>{
        console.log(e)
        res.status(400).send("fail");      
    })           
  })

app.post('/api/adduserfile',jsonParser,urlencodedParser,function (req, res, next) {
    let tokencontroller = require('../controller/token_controller');
    tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let email = req.body.email;
        console.log(email)
        console.log(data.email)
        if(email.trim()!=data.email.trim())
        {
            let idfile = req.body.idfile;
            let usercontroller = require('../controller/user_controller');
            usercontroller.getuserbyEmail(email).then(data=>{
            let file_controller = require('../controller/file_controller');
            let userid =data.id
            file_controller.checkexist(data.id,idfile).then(data=>{
              if(data===true)
              {
                file_controller.addUsertoFile(userid,idfile).then(data=>{
                  res.status(200).send('done');      
                }).catch((e)=>{
                  res.status(400).send("fail");      
                  })  
              }
              else
              {
                res.status(400).send("themexist"); 
              } 
            })
           }).catch((e)=>{
              res.status(400).send("notexist");      
           })  
        }
        else
        {
          console.log(email)
          console.log(email)
          res.status(400).send("youremail");      
        }          
        }).catch((e)=>{
            console.log(e)
            res.status(400).send("fail")
        })
  })

module.exports= app;