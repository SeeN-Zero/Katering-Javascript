const Code = require('../model/code')
const Ulasan = require('../model/ulasan')

/* By Senna Annaba Ahmad */

/*
=============================================
              ULASAN CONTROLLER
=============================================
*/

const viewUlasan = async (req, res) => {
  const code = await Code.findOne({ code: 'code' }).exec()
  const username = await req.user.username
  Ulasan.find({},
    (err, ulasans) => {
      if (err) {
        console.log(err)
        res.redirect('/produk')
      } else {
        res.render('ulasan', {
          ulasans,
          username,
          code,
          messagesuc: req.flash('success'),
          messageerr: req.flash('error')
        })
      }
    }
  )
}

const addUlasan = async (req, res) => {
  const number = await Code.findOne({ code: 'code' }).exec()
  if (req.body.code === number.number) {
    const obj = {
      nama: req.body.nama,
      ulasan: req.body.ulasan
    }
    Ulasan.create(obj, (err) => {
      if (err) {
        console.log(err)
        req.flash('error', err)
        res.redirect('/')
      } else {
        req.flash('success', 'Ulasan Berhasil Terima Kasih')
        const number = Math.floor(100000 + Math.random() * 900000)
        Code.findOneAndUpdate({ code: 'code' }, { number: number.toString() }).exec()
        res.redirect('/')
      }
    })
  } else {
    console.log(number + '' + req.body.code)
    req.flash('error', 'Code yang dimasukkan salah/Sudah t  erpakai')
    res.redirect('/')
  }
}

const getCode = async (req, res) => {
  const number = Math.floor(100000 + Math.random() * 900000)
  await Code.findOneAndUpdate({ code: 'code' }, { number: number.toString() }).exec()
  Code.findOne({ code: 'code' }, (err, code) => {
    if (err) {
      req.flash('error', err)
    } else {
      res.json({ code })
    }
  })
}

const deleteUlasan = (req, res) => {
  const id = req.params.id
  Ulasan.findByIdAndRemove({ _id: id }, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/ulasan')
    } else {
      req.flash('success', 'Ulasan Berhasil Dihapus')
      res.redirect('/ulasan')
    }
  })
}

module.exports = { getCode, addUlasan, viewUlasan, deleteUlasan }
