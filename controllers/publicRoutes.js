const express =   require('express');
const router = express.Router();
const articleSchema = require('../model/article.js');


router.get('/article/:articleId', (req, res, next) => {


    //get all articles
    articleSchema.findById(req.params.articleId)
    .populate('article')
    .then(article => {

        //send them back
        res.status(201).json(article);
    })
    .catch(e=> console.log());
});

router.get('/', (req, res, next) => {
    
        res.render('home', {
            title: 'Portifolio'
        });
    
});

router.get('/contact', (req, res, next) => {
    res.render('contactme', {
        title: 'Contact Me'
    });
});

router.get('/article', (req, res, next) => {
    articleSchema.find()
    .populate('article')
    .then(articles => {
        //send them back
        res.status(201).json(articles);
    
    })
    .catch(e=> console.log());

});




module.exports = router;