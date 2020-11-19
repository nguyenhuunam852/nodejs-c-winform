let models = require('../../models');
let controller = {};
let User = models.User;

controller.login= (username,login) => {
    return new Promise((resolve,reject)=>{
      try {        
        User.findOne({where: {username:username.trim(),password:login.trim()}}).then(data=>resolve(data)).catch(error=>reject(new Error(error)));
      }
      catch (e) {
        console.log("entering catch block");
        console.log(e);
        console.log("leaving catch block");
      }
   });
  };

module.exports= controller;