const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Silahkan Login Terlebih Dahulu');
    res.redirect('/auth');
};

const redirectRoute = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/produk');
};

module.exports = {
    protectRoute,
    redirectRoute
};
