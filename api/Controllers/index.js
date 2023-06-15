function index(req, res, next) {
    res.render('index', {
        title: 'Heerewigo api'
    });
}

module.exports = {index}