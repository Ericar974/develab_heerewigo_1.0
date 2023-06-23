var router = require('express').Router();
const {requiresAuth} = require('express-openid-connect');
const profile = require("../Controllers/profile")
const place = require("../Controllers/place")
const admin = require("../Controllers/admin")
const map = require("../Controllers/map")
const index = require("../Controllers/index")

// GET
router.get('/', index.index)

router.get('/map', map.index);
// require connexion
router.get('/profile', requiresAuth(), profile.index);
router.get('/addPlace', requiresAuth(), place.index);
router.get('/admin', requiresAuth(), admin.index);

// POST
router.post('/addPlace', requiresAuth(), place.add);

module.exports = router;
