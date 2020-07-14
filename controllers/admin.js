const express =   require('express');
const router = express.Router();
const articleSchema = require('../model/article.js');
const readJsonAndAutoDestruct = require('../util/filehelper.js').readJsonAndAutoDestruct;
const { json } = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}));



function deleteFile(path){
    fs.unlink(path, e =>{
        if(e){
            throw (e);
        }
    });
}

router.get('/article', (req, res, next) => {
    res.render('article', {
        title: 'Add Article'
    });
});

router.post('/article', async (req, res, next) => {
    if(!req.files.image){
        const error = new Error('No Main Image provided');
        error.status = 422;
        throw error;
    }
    const imageURL = req.files.image[0].path;


    let path = req.files.objectsArray[0].path;
    fs.readFile(path, (e, articleData) => {
        let jsonArray = [...JSON.parse(articleData)];
        deleteFile(path);


        const newArticle = new articleSchema({
            creation: new Date()
        });

        jsonArray.forEach(element => {
            if(element.name === 'main-image' || element.name === 'image'){
                newArticle.addElement(imageURL, element.position, element.name);
            }else{
                newArticle.addElement(element.value, element.position,element.name);
            }
        });   

        newArticle.save()
        .then(result => {
                res.status(201).json({
                    message:'article created succesfully'
                });
        }).catch(e=> console.log('error', e) );
        
    });
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

    
    
});    
   



   

    


module.exports = router;