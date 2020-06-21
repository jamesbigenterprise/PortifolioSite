const express =   require('express');
const router = express.Router();

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

router.post('/')

module.exports = router;