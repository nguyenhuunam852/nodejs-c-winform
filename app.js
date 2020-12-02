const express = require('express'); 
var bodyParser = require('body-parser');
let app = express();
var fs = require('fs');


app.get('/downloads/:file', function(req,res){
  id= req.params.file
  res.download("downloads/"+id)
  
})

app.get('/sync',function(req,res){
  let models = require('./models');
  models.sequelize.sync().then(()=>{
    res.send("done")
  });
})

app.use('/users',require('./server/route/user_route'));
app.use('/files',require('./server/route/file_route'));

app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),()=>{
   console.log(`Server is running at port ${app.get('port')}`);
});

