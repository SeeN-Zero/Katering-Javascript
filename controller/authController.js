const passport = require('passport')

const authView = (req, res) => {
  res.render('authentication', {
    messagesuc: req.flash('success'),
    messageerr: req.flash('error')

  })
}

const updateUserView = (req, res) => {
  const username = req.user.username
  res.render('accountsetting', {
    username,
    messagesuc: req.flash('success'),
    messageerr: req.flash('error')
  })
}

const updateUser = (req, res) => {
  const { oldPassword, newPassword, retypePassword } = req.body
  if (newPassword !== retypePassword) {
    req.flash('error', 'Pengetikan Ulang Password Salah')
    res.redirect('/accountsetting')
  } else if (newPassword.length < 8 || retypePassword.length < 8) {
    req.flash('error', 'Password Minimal 8 Karakter')
    res.redirect('/accountsetting')
  } else {
    req.user.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        req.flash('error', 'Password Lama Salah')
        res.redirect('/accountsetting')
      } else {
        req.flash('success', 'Password Berhasil Diubah')
        res.redirect('/accountsetting')
      }
    })
  }
}

const auth = (req, res) => {
  if (req.body.formType === 'login') {
    passport.authenticate('local',
      {
        successRedirect: '/product',
        failureRedirect: '/auth',
        failureFlash: 'Password Atau Username Salah',
        successFlash: 'Selamat Datang'
      })(req, res)
  }
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/auth')
}
module.exports = { authView, auth, updateUserView, updateUser, logout }
