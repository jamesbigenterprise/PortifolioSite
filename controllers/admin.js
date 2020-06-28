const express =   require('express');
const router = express.Router();
const articleSchema = require('../model/article.js');
const { json } = require('body-parser');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}));

router.get('/', (req, res, next) => {
    res.render('home', { 
        title: 'Portifolio'
    });
});

router.get('/article', (req, res, next) => {
    res.render('article', {
        title: 'Article'
    });
});

router.post('/article', (req, res, next) => {
    const newArticle = new articleSchema({
        creation: new Date()
    });

    console.log('server: ',req.body);
    req.body.forEach(element => {
    newArticle.addElement(element.value, element.htmltype, element.position);   
    });   

    console.log('article created', newArticle);
    
   newArticle.save()
   .then(result => {
        res.status(201).json({
            message:'article created succesfully'
        });
   }).catch(e=> console.log('error', e) );
          
});

router.get('/contact', (req, res, next) => {
    res.render('contact', {
        title: 'Contact'
    });
});
    
router.post('/contact', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    transporter.sendMail({
        to:'jamesenterprise@byui.edu',
        from: 'thiagoalvesda0silva@gmail.com',
        subject:name,
        html: '<p>' + message +'  '+email+ '</p>'
    }).then((e) =>{
        console.log(e);
        
        res.redirect('/');
    }).catch(e=> console.log('error', e)
    );
    console.log(name, email, message);
    
    
});    
   



   

    


module.exports = router;