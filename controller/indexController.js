const indexView = (req, res) => {
    res.render('index', {title: "Express", user: req.user});
};
module.exports = {
    indexView,
};