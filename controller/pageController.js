const Page = require('../model/page')

/* By Senna Annaba Ahmad */

/*
=============================================
              PRODUK CONTROLLER
=============================================
*/
/*
=============================================
                    VIEW
=============================================
*/
const viewPageSetting = async (req, res) => {
  const username = await req.user.username
  Page.findOne({ setting: 'setting' },
    (err, page) => {
      if (err) {
        console.log(err)
        res.redirect('/pageSetting')
      } else {
        res.render('pagesetting', {
          page,
          username,
          messagesuc: req.flash('success'),
          messageerr: req.flash('error')
        })
      }
    })
}
/*
=============================================
                    CRUD
=============================================
*/

/* ===============UPDATE================== */
const updatePage = (req, res) => {
  const id = req.params.id
  if (req.file) {
    const obj = {
      title: req.body.title,
      logo: {
        data: req.file.buffer,
        contentType: 'image/png'
      },
      header: req.body.header,
      subheader: req.body.subheader,
      about: req.body.about,
      address: req.body.address,
      number: req.body.number
    }
    Page.findOneAndUpdate({ setting: id }, obj, (err) => {
      if (err) {
        req.flash('error', err)
        console.log(err)
        res.redirect('/pagesetting')
      } else {
        req.flash('success', 'Halaman Utama Berhasil Diupdate')
        res.redirect('/pagesetting')
      }
    })
  } else {
    const obj = {
      title: req.body.title,
      header: req.body.header,
      subheader: req.body.subheader,
      about: req.body.about,
      address: req.body.address,
      number: req.body.number
    }
    console.log(obj)
    Page.findOneAndUpdate({ setting: id }, obj, (err) => {
      if (err) {
        req.flash('error', err)
        console.log(err)
        res.redirect('/pagesetting')
      } else {
        req.flash('success', 'Halaman Utama Berhasil Diupdate')
        res.redirect('/pagesetting')
      }
    })
  }
}
module.exports = { viewPageSetting, updatePage }
