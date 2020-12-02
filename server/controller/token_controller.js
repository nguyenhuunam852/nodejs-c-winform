let models = require('../../models');
let controller = {};

let uToken = models.uToken;
let User = models.User;

controller.deleteToken = (iduser)=>{
    return new Promise((resolve,reject)=>{
        try { 
            uToken.delete({
                iduser:id
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)))    
        }
        catch (e) {
          console.log("entering catch block");
          console.log(e);
          console.log("leaving catch block");
        }
     });
}
controller.getUserwithToken = (token) =>{
    return new Promise((resolve,reject)=>{
        try { 
            uToken.findOne({
              where:{
               token:token
              }
            })
            .then(data=>{
              resolve(User.findOne({
                where:{
                 id:data.iduser
                }
              }))
            })
            .catch(error=>reject(new Error(error)))    
        }
        catch (e) {
          console.log("entering catch block");
          console.log(e);
          console.log("leaving catch block");
        }
     });
}
controller.createToken = (token,active,id) =>{
    return new Promise((resolve,reject)=>{
        try { 
            uToken.create({
                token:token,
                active_time:active,
                iduser:id
            })
            .then(data=>resolve(data))
            .catch(error=>reject(new Error(error)))    
        }
        catch (e) {
          console.log("entering catch block");
          console.log(e);
          console.log("leaving catch block");
        }
     });
}
controller.getToken=(token)=>{
  return new Promise((resolve,reject)=>{
    try { 
        uToken.findOne({
          where:{
           token:token
          }
        })
        .then(data=>{
          resolve(data)
        })
        .catch(error=>reject(new Error(error)))    
    }
    catch (e) {
      console.log("entering catch block");
      console.log(e);
      console.log("leaving catch block");
    }
 });
}

module.exports= controller;