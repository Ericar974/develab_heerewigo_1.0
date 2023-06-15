const db = require("../database/db");

// not use ( a unique page for adding a point )
function index(req, res) {
    let lat = req.query.lat;
    let lng = req.query.lng;

    res.json({ title: 'Ajouter un lieu', lat: lat, lng:lng});
}

// the function to add a point
async function add(req, res, next) {
    try {
        const { name, positionx, positiony } = await req.body;
        console.log(name)
        await db.query(`INSERT INTO lieux (name, position_x, position_y, images_id) VALUES ('${name}', '${positionx}', '${positiony}', JSON_OBJECT())`);
    } catch (err) {
        next(err);
    }
}

module.exports = {index, add};