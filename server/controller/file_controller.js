let models = require('../../models');
let controller = {};
let File = models.File;
let User = models.User;
let UserFile = models.UserFileView;

controller.getlistuser=(idfile)=>{
  return new Promise((resolve,reject)=>{
     UserFile.findAll({
       where:{
         idfile:idfile
       },
       include: [
        { model: User }
       ]
     }).then(data=>{
      resolve(data.map(item=>{
        return item.User
      }))
     }).catch((error)=>reject(new Error(error)))
  });
};
controller.addUsertoFile=(iduser,idfile)=>{
  return new Promise((resolve,reject)=>{
    UserFile.create({
      iduser:iduser,
      idfile:idfile
    }).then(data=>{
      resolve(data)
     }).catch((error)=>reject(new Error(error)))
 });
}
controller.checkexist=(iduser,idfile)=>{
  return UserFile.count({ where: { iduser: iduser,idfile:idfile } })
  .then(count => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}
controller.insertOne= (file,key,iduser) => {
    return new Promise((resolve,reject)=>{
        File.create(
        {
          filename:file,
          key:key,
          iduser:iduser
        }).then((data)=>resolve(data)).catch((error)=>reject(new Error(error)))    
   });
  };
  controller.getlistFile= (iduser) => {
    return new Promise((resolve,reject)=>{
        File.findAll({iduser:iduser}).then((data)=>resolve(data)).catch((error)=>reject(new Error(error)))    
   });
  };

module.exports= controller;