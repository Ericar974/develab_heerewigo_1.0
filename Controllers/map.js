const db = require("../database/db");

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

module.exports = {index};