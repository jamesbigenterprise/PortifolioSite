const express = require ('express');
const app = express();

const publicRoutes = require('./controllers/publicRoutes.js');

app.set('view engine', 'ejs')
   .use('/', publicRoutes)
   .listen(7000);