const db = require("../database/db");

function index(req, res) {
    res.render('place/add', { title: 'Ajouter un lieu' });
}

async function add(req, res, next) {
    try {
        const { name, positionx, positiony } = await req.body;
        console.log(name)
        await db.query(`INSERT INTO lieux (name, position_x, position_y, images_id) VALUES ('${name}', '${positionx}', '${positiony}', JSON_OBJECT())`);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

module.exports = {index, add};