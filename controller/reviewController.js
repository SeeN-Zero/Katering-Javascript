const Code = require('../model/code')
const Review = require('../model/review')

/* By Senna Annaba Ahmad */

/*
=============================================
              ULASAN CONTROLLER
=============================================
*/

const viewReview = async (req, res) => {
  const code = await Code.findOne({ code: 'code' }).exec()
  const username = await req.user.username
  Review.find({},
    (err, reviews) => {
      if (err) {
        console.log(err)
        res.redirect('/product')
      } else {
        res.render('review', {
          reviews,
          username,
          code,
          messagesuc: req.flash('success'),
          messageerr: req.flash('error')
        })
      }
    }
  )
}

const addReview = async (req, res) => {
  const number = await Code.findOne({ code: 'code' }).exec()
  if (req.body.code === number.number) {
    const obj = {
      name: req.body.name,
      content: req.body.content
    }
    Review.create(obj, (err) => {
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
    req.flash('error', 'Code yang dimasukkan salah/Sudah terpakai')
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

const deleteReview = (req, res) => {
  const id = req.params.id
  Review.findByIdAndRemove({ _id: id }, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/product')
    } else {
      req.flash('success', 'Ulasan Berhasil Dihapus')
      res.redirect('/review')
    }
  })
}

module.exports = { getCode, addReview, viewReview, deleteReview }
