const express = require ('express');
const app = express();
const PORT = process.env.PORT || 7000;
const publicRoutes = require('./controllers/publicRoutes.js');

app.set('view engine', 'ejs')
   .use('/', publicRoutes)
   .listen(PORT);