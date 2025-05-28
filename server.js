const app = require('./app');
const {sequelize} = require('./models');

const PORT =process.env.PORT||4000;
sequelize.sync().then(() => {
  console.log('database sync');
  
  app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`);
  });    
         
}).catch(err => {        
  console.error('connection failed', err);
});
