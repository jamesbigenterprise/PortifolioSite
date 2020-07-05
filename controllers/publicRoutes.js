const express =   require('express');
const router = express.Router();
const articleSchema = require('../model/article.js');

router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Portifolio'
    });
});

router.get('/article', (req, res, next) => {
    res.render('articleView', {
        title: 'Individual Article'
    });
});
//TODO
//Make it dynamic to open specific articles
router.get('/articleID', (req, res, next) => {

    //get all articles
    articleSchema.findOne()
    .populate('article')
    .then(article => {
        console.log('data retrieved', article);
        //send them back
        res.status(201).json(article)
    })
    .catch(e=> console.log());
     
});


module.exports = router;