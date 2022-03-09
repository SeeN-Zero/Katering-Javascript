const User = require("../model/user");
const passport = require("passport");

const authView = (req, res) => {
    res.render('authentication', {title: 'Authentication'});
}
const auth = (req, res) => {
    if ('login' === req.body.formType) {
        const {username, password} = req.body;
        //Required
        if (!username || !password) {
            console.log("Please fill in all the fields");
            res.render('authentication', {title: 'Authentication'});
        } else {
            passport.authenticate("local",
                {
                    successRedirect: "/dash",
                    failureRedirect: "/auth"
                })(req, res), function (req, res) {

            }
        }
    } else {
        const {namereg, usernamereg, passwordreg} = req.body;
        if (!namereg || !usernamereg || !passwordreg) {
            console.log("Fill empty fields");
            res.render('authentication', {title: 'Authentication'});
        }
        //Validation
        User.register(new User({name: namereg, username: usernamereg}), passwordreg, function (err) {
            if (err) {
                console.log('error while user register!', err);
                return next(err);
            }
            console.log('user registered!');
            res.render('authentication', {title: 'Authentication'});
        });
    }
};
module.exports = {authView, auth};