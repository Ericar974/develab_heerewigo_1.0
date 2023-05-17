var router = require('express').Router();
const {requiresAuth} = require('express-openid-connect');
const db = require("../database/db");
const profile = require("./profile")
const place = require("./place")
const admin = require("./admin")

// GET
router.get('/', index);
router.get('/profile', requiresAuth(), profile.index);
router.get('/addPlace',  requiresAuth(),place.index);
router.get('/admin', admin.index);

// POST
router.post('/addPlace', place.add);

function index (req, res, next) {
    db.query('SELECT * FROM lieux').then((data) => {
        res.render('map/index', {
            data: data,
            title: 'HEEREWIGO',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    }).catch((err) => {
        next(err);
    });
}

module.exports = router;
