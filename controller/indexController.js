const Page = require('../model/page')
const Produk = require('../model/produk')
const Artikel = require('../model/artikel')
const Ulasan = require('../model/ulasan')

/* By Senna Annaba Ahmad */

/*
=============================================
              INDEX CONTROLLER
=============================================
*/
/*
=============================================
                    VIEW
=============================================
*/
const viewIndex = async (req, res) => {
  const page = await Page.findOne({ setting: 'setting' }).exec()
  const produks = await Produk.find({}).exec()
  const artikels = await Artikel.find({}).exec()
  const ulasans = await Ulasan.find({}).exec()
  const fUlasan = await ulasans.shift()
  const totUlasan = await Ulasan.estimatedDocumentCount()
  res.render('index', {
    produks,
    page,
    artikels,
    fUlasan,
    ulasans,
    totUlasan,
    messagesuc: req.flash('success'),
    messageerr: req.flash('error')
  })
}

const artikelBlogView = async (req, res) => {
  const id = req.params.id
  const page = await Page.findOne({ setting: 'setting' }).exec()
  const artikel = await Artikel.findOne({ _id: id }).exec()
  res.render('artikelBlogView', { artikel, page })
}
module.exports = { viewIndex, artikelBlogView }
