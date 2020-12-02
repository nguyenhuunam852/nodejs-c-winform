let express = require('express');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require("path");
const app = express.Router();
var mime = require('mime');
var multer  = require('multer');
var fs = require('fs');
var storagepath = `${__dirname}/../../uploads/docs`
var curremtpath = `${__dirname}`
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
      let tpyelist=['application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/xml']
      if(tpyelist.indexOf(mime.getType(file.originalname))<2)
      {
       callback(null, path.join(`${__dirname}/../../uploads/docs`));
      }
      else
      {
        callback(null, path.join(`${__dirname}/../../uploads/publickeys`));
      }
  
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
})
var upload = multer({ storage: storage })


app.post('/api/postfile', upload.array('files', 2),function (req, res, next) {
  let filecontroller = require('../controller/file_controller');
  filecontroller.insertOne(req.files[0].filename,req.files[1].filename,req.body.iduser).then(data=>{
    res.status(200).send("upload complete");      
  }).catch((e)=>{
    res.status(400).send("fail");      

  })   
})

app.post('/api/listfile',jsonParser,urlencodedParser,function (req, res, next) {
    let tokencontroller = require('../controller/token_controller');
    console.log(1);
    tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let file_controller = require('../controller/file_controller');
        file_controller.getlistFile(data.id).then(data=>{
            res.status(200).send(data.splice(0,5));      

        })     
    })           
  })

app.post('/api/check_permission',jsonParser,urlencodedParser,function(req,res,next){
  let tokencontroller = require('../controller/token_controller');
  tokencontroller.getUserwithToken(req.body.token).then(data=>{
    var user=data
    let filecontroller =require('../controller/file_controller');
    filecontroller.getFileById(req.body.idfile).then(data=>{
        var file=data
        filecontroller.checkpermission(user.id,file.id).then(data=>{
          if(data===true)
          {
            console.log(1);
            res.status(200).send("1")
          }
          else
          {
            res.status(200).send("0")
          }
        })
    })
  })

})

app.post('/api/getallfile',jsonParser,urlencodedParser,function(req,res,next){
  let tokencontroller = require('../controller/token_controller');
  tokencontroller.getUserwithToken(req.body.token).then(data=>{
    let filecontroller = require('../controller/file_controller');
    filecontroller.getAlllistFile(data.id).then(data=>{
      res.status(200).send(data.splice(0,5));  
    }).catch((e)=>{
      res.status(400).send("fail");      
    })   
  }).catch((e)=>{
    res.status(400).send("fail");      
  })   
})

app.post('/api/readydownloadfile',jsonParser,urlencodedParser,function(req,res,next){
    var id = req.body.id
    let tokencontroller = require('../controller/token_controller');
       tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let filecontroller = require('../controller/file_controller');
        filecontroller.getFileById(id).then(data=>{
          var oldPath = storagepath+"/"+data.filename
          var filen = data.filename
          var tempcurrent = "/../../downloads/"+filen;
          var newPath = curremtpath +tempcurrent;
          var urlpostdata = "/downloads/"+filen;
          fs.copyFile(oldPath, newPath, function (err) {
            if (err) throw err
            console.log(urlpostdata)
            res.status(200).send(urlpostdata);      
          }).catch((e)=>{
            res.status(400).send("fail");      
          })   
        }).catch((e)=>{
          res.status(400).send("fail");      
        })   
    })
});  


app.post('/api/listuser',jsonParser,urlencodedParser,function (req, res, next) {
    let tokencontroller = require('../controller/token_controller');
    tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let file_controller = require('../controller/file_controller');
        file_controller.getlistuser(req.body.idfile).then(data=>{
            res.status(200).send(data);      
        }).catch((e)=>{
            res.status(400).send("fail");      
          })   
    }).catch((e)=>{
        res.status(400).send("fail");      
    })           
  })

app.post('/api/adduserfile',jsonParser,urlencodedParser,function (req, res, next) {
    let tokencontroller = require('../controller/token_controller');
    tokencontroller.getUserwithToken(req.body.token).then(data=>{
        let email = req.body.email;
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
          res.status(400).send("youremail");      
        }          
        }).catch((e)=>{
            res.status(400).send("fail")
        })
  })

module.exports= app;