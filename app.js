const express = require ('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 7000;
const publicRoutes = require('./controllers/publicRoutes.js');
const adminRoutes = require('./controllers/admin.js');

app.set('view engine', 'ejs')
   .use(express.static(path.join(__dirname, 'public')))
   .use('/', publicRoutes)
   .use('/admin', adminRoutes)
   .listen(PORT);