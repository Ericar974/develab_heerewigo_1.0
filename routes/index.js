var router = require('express').Router();
const {requiresAuth} = require('express-openid-connect');
const db = require("../database/db");


router.get('/', function (req, res, next) {
    db.query('SELECT * FROM lieux').then((data) => {
        res.render('index', {
            data: data,
            title: 'HEEREWIGO',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    }).catch((err) => {
        next(err);
    });
});
router.get('/profile', requiresAuth(), function (req, res, next) {
    res.render('profile', {
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        title: 'Profile page'
    });
});

router.get('/test', function (req, res, next) {
    db.query('SELECT * FROM lieux').then((data) => {
        res.render('test', {
            data: data,
            title: 'test'
        });
    }).catch((err) => {
        next(err);
    });
});

// Affiche la page du formulaire d'ajout de lieu
router.get('/addPlace',  requiresAuth(), (req, res) => {
    res.render('addPlace', { title: 'Ajouter un lieu' });
});

// Traite la soumission du formulaire d'ajout de lieu
router.post('/addPlace', async (req, res, next) => {
    try {
        const { name, positionx, positiony } = await req.body;
        console.log(name)
        await db.query(`INSERT INTO lieux (name, position_x, position_y, images_id) VALUES ('${name}', '${positionx}', '${positiony}', JSON_OBJECT())`);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// for later
router.get('/admin', function (req, res, next) {
    res.render('admin', {
        title: 'admin'
    });
});

module.exports = router;
