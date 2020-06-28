const express = require ('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();



const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://mongo341:mongo341@cluster0-j1hjj.mongodb.net/portfolio?retryWrites=true&w=majority';
const corsOptions = {
   origin: "https://thiago-alves-portifolio.herokuapp.com/",
   optionsSuccessStatus: 200
};

const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false, 
   family: 4
};


const PORT = process.env.PORT || 7000;
const publicRoutes = require('./controllers/publicRoutes.js');
const adminRoutes = require('./controllers/admin.js');

app.set('view engine', 'ejs')
   .use(express.static(path.join(__dirname, 'public')))
   //.use(bodyparser.json())
   .use(bodyparser({extended: false})) // For parsing the body of a POST
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
  })
   .use('/', publicRoutes)
   .use('/admin', adminRoutes);

   mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  })
  .catch(err => {
    console.log(err);
  });

