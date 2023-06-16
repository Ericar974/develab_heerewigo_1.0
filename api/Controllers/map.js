const db = require("../database/db");

function index(req, res, next) {
    db.query('SELECT * FROM lieux')
        .then((data) => {
            const responseBody = {
                data: data,
                title: 'HEEREWIGO',
                isAuthenticated: req.oidc.isAuthenticated(),
                additionalInfo: 'Some additional information',
            };
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            res.json(responseBody);
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = { index };
