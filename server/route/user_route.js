let express = require('express');
var bodyParser = require('body-parser')
var hat = require('hat')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express.Router();
app.post('/api/checktoken',jsonParser,urlencodedParser,(req,res,next)=>{
  if(!req.body) return res.sendStatus(400);
  else{
    let controller = require('../controller/token_controller');

    controller.getUserwithToken(req.body['token']).then(
      data=>{
        var date = new Date(data.createdAt);
        var seconds = date.getTime() / 1000;
        var nowdate = Date.now();
        var now = new Date(nowdate).getTime() / 1000;         
        resp={}        
        if(Math.trunc(now)>Math.trunc(seconds)+Math.trunc(data.active_time))
        {
           resp.signal='login'
        }
        else
        {
          resp.signal='done';
          resp.user=data.iduser;
          let usercontroller = require('../controller/user_controller');
          usercontroller.getUser(data.iduser).then(data=>{
            resp.userrole = data.idrole;
            return res.status(200).send(resp);
          })
          .catch((e)=>{
            resp.signal='fail'
            resp.code = -2
            return res.status(400).send(resp)
          })
        }
    })
    .catch((e)=>{
      resp.signal='fail'
      resp.code = -3
      return res.status(400).send(resp)
    })
  }
})

app.post('/api/login',jsonParser,urlencodedParser,(req,res,next)=>{
  if(!req.body) return res.sendStatus(400);
  else{
      let controller = require('../controller/user_controller');
      controller.login(req.body['username'],req.body['password']).then((body)=>{
         data1={}
         console.log(1)
         if(body!=null)
         {
           data1.id=body.id
           controller.checktoken(body.id).then((data)=>{
               if(data!=undefined)
               {
                 var date = new Date(data.createdAt);
                 var seconds = date.getTime() / 1000;
                 var nowdate = Date.now();
                 var now = new Date(nowdate).getTime() / 1000;                 
                 if(Math.trunc(now)>Math.trunc(seconds)+Math.trunc(data.active_time))
                 {
                    var id = hat();
                    console.log(id);
                    var active = 432000
                    let tokencontroller = require('../controller/token_controller');
                    tokencontroller.deleteToken(body.id).then(()=>{
                      tokencontroller.createToken(id,active,body.id).then((data)=>{
                        data1.token = data.token;
                        data1.idrole = body.idrole;
                        return res.status(200).send(data1);
                      }).catch((e)=>{
                        return res.status(400);
                      })
                    }).catch((e)=>{
                      return res.status(400);
                    })
                   
                 }
                 else
                 {
                   console.log(data.token)
                   data1.token = data.token
                   data1.idrole = body.idrole
                   return res.status(200).send(data1);
                 }
               }
               else
               {
                var id = hat();
                console.log(id);
                var active = 432000
                let tokencontroller = require('../controller/token_controller');
                tokencontroller.createToken(id,active,data1.id).then((data)=>{
                  data1.token = data.token;
                  data1.idrole = body.idrole
                  return res.status(200).send(data1);
                }).catch((e)=>{
                  return res.status(400);
                })
               }
           })
           //data['token']='123456789';
           return res.status(400);

         }
         else{
           return res.sendStatus(400);
         }
      })
      .catch((e)=>{
         console.log(e);
         return res.sendStatus(400);
      });
  }
 })

module.exports= app;