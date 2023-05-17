function index(req, res, next) {
    res.render('admin/index', {
        title: 'admin'
    });
}

module.exports = {index}