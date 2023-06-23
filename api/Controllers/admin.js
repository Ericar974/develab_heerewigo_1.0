function index(req, res, next) {
    res.json({
        title: 'admin'
    });
}

module.exports = {index}