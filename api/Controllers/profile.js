function index(req, res, next) {
    res.json({
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        title: 'Profile page'
    });
}

module.exports = {index}