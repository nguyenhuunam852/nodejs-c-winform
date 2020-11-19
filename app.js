const express = require('express'); 
const bodyParser = require("body-parser");
let app = express();

app.get('/',function(req,res){
  res.send('KAlibaba');
})

app.get('/sync',function(req,res){
  let models = require('./models');
  models.sequelize.sync().then(()=>{
    res.send("done")
  });
})
app.use('/users',require('./server/route/user_route'));

app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),()=>{
   console.log(`Server is running at port ${app.get('port')}`);
});

