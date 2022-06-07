const Artikel = require('../model/artikel')

/* By Senna Annaba Ahmad */

/*
=============================================
              ARTIKEL CONTROLLER
=============================================
*/

/*
=============================================
                    VIEW
=============================================
*/
const viewArtikel = async (req, res) => {
  const username = await req.user.username
  Artikel.find({ author: username },
    (err, artikels) => {
      if (err) {
        console.log(err)
        res.redirect('/produk')
      } else {
        res.render('artikel', {
          artikels,
          username,
          messagesuc: req.flash('success'),
          messageerr: req.flash('error')
        })
      }
    })
}
const viewArtikelAdd = async (req, res) => {
  const username = await req.user.username
  res.render('artikelAdd', {
    username,
    messagesuc: req.flash('success'),
    messageerr: req.flash('error')
  })
}
const viewArtikelEdit = async (req, res) => {
  const id = req.params.id
  const username = await req.user.username
  Artikel.find({ _id: id },
    (err, artikel) => {
      if (err) {
        console.log(err)
        res.redirect('/artikelEdit')
      } else {
        res.render('artikelEdit', {
          artikel,
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

/* ===============ADD================== */
const addArtikel = async (req, res) => {
  const username = await req.user.username
  const obj = {
    judul: req.body.judul,
    caption: req.body.caption,
    isi: req.body.isi,
    author: username
  }
  Artikel.create(obj, (err) => {
    if (err) {
      console.log(err)
      req.flash('error', err)
      res.redirect('/artikeladd')
    } else {
      req.flash('success', 'Artikel Berhasil Ditambahkan')
      res.redirect('/artikel')
    }
  })
}

/* ===============UPDATE================== */
const updateArtikel = (req, res) => {
  const id = req.params.id
  const obj = {
    judul: req.body.judul,
    caption: req.body.caption,
    isi: req.body.isi
  }
  Artikel.findByIdAndUpdate({ _id: id }, obj, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/artikelEdit')
    } else {
      req.flash('success', 'Artikel Berhasil Diupdate')
      res.redirect('/artikel')
    }
  })
}

/* ===============DELETE================== */
const deleteArtikel = (req, res) => {
  const id = req.params.id
  Artikel.findByIdAndRemove({ _id: id }, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/artikel')
    } else {
      req.flash('success', 'Artikel Berhasil Dihapus')
      res.redirect('/artikel')
    }
  })
}

module.exports = { viewArtikelAdd, viewArtikelEdit, viewArtikel, addArtikel, deleteArtikel, updateArtikel }
