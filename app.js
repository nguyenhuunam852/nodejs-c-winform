const express = require('express'); 

let app = express();

const port = 8080;

app.get('/',function(req,res){
  res.send('Alibaba');
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

