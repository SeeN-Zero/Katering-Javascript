const User = require("../model/user");
const passport = require("passport");

const authView = (req, res) => {
    res.render('authentication', {
        title: 'Authentication',
        messagesuc: req.flash('success'),
        messageerr: req.flash('error')

    });
};

const updateView = (req, res) => {
    const username = req.user.username;
    res.render('accSetting', {
        username,
        messagesuc: req.flash('success'),
        messageerr: req.flash('error')
    })
};

const updateUser = (req, res) => {
    const {oldPassword, newPassword, retypePassword} = req.body;
    if (newPassword !== retypePassword) {
        req.flash('error', 'Pengetikan Ulang Password Salah');
        res.redirect('/accSetting');
    } else if (newPassword.length < 8 || retypePassword.length < 8) {
        req.flash('error', 'Password Minimal 8 Karakter');
        res.redirect('/accSetting');
    } else {
        req.user.changePassword(oldPassword, newPassword, (err) => {
            if (err) {
                req.flash('error', 'Password Lama Salah');
                console.log('Gagal');
                res.redirect('/accSetting');
            } else {
                req.flash('success', 'Password Berhasil Diubah');
                res.redirect('/accSetting');
            }
        })
    }
};

const auth = (req, res) => {
    if ('login' === req.body.formType) {
        passport.authenticate("local",
            {
                successRedirect: "/produk",
                failureRedirect: "/auth",
                failureFlash: "Password Atau Username Salah",
                successFlash: "Selamat Datang"
            })(req, res)
    } else {
        const {usernamereg, passwordreg} = req.body;
        if (passwordreg.length < 8) {
            req.flash('error', 'Password Minimal 8 Karakter');
            res.redirect('/auth');
        } else {
            User.register(new User({username: usernamereg}), passwordreg, function (err) {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Username ' + usernamereg + ' Sudah Ada');
                    res.redirect('/auth');
                } else {
                    req.flash('success', 'Pendaftaran Akun Berhasil');
                    res.redirect('/auth');
                }
            });
        }
    }
};

const logout = (req, res) => {
    req.logout();
    res.redirect('/auth')
};
module.exports = {authView, auth, updateView, updateUser, logout};