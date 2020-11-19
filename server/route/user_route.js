let express = require('express');
const app = express.Router();

app.post('/api/login',(req,res,next)=>{
  if(!req.body) return res.sendStatus(400);
  else{
      console.log('Processing ...')
      let controller = require('../controller/user_controller');
      console.log(req.body['username']);
      controller.login(req.body['username'],req.body['password']).then((body)=>{
         data={}
         if(body!=null)
         {
           data=body
           //data['token']='123456789';
           return res.status(200).send(data);
         }
         else{
           return res.sendStatus(400);
         }
      })
      .catch(()=>{
         return res.sendStatus(400);
      });
  }
 })

module.exports= app;