let models = require('../../models');
let controller = {};

let uToken = models.uToken;
let user = models.User;

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
              token:token
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

module.exports= controller;