const multer = require('multer')
const Product = require('../model/product')
const Article = require('../model/article')

/* By Senna Annaba Ahmad */

/*
=============================================
                MULTER SETTING
=============================================
*/
const storage = multer.memoryStorage()
const upload = multer({ storage })

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
const viewProduct = async (req, res) => {
  const totalProduct = await Product.estimatedDocumentCount()
  const totalArticle = await Article.estimatedDocumentCount()
  const username = await req.user.username
  Product.find({},
    (err, products) => {
      if (err) {
        console.log(err)
        res.redirect('/product')
      } else {
        res.render('product', {
          products,
          totalProduct,
          totalArticle,
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
const addProduct = (req, res) => {
  const obj = {
    name: req.body.name,
    description: req.body.deskripsi,
    image: {
      data: req.file.buffer,
      contentType: 'image/png'
    }
  }
  Product.create(obj, (err) => {
    if (err) {
      console.log(err)
      req.flash('error', err)
      res.redirect('/product')
    } else {
      req.flash('success', 'Produk Berhasil Ditambahkan')
      res.redirect('/product')
    }
  })
}

/* ===============UPDATE================== */
const updateProduct = (req, res) => {
  const id = req.params.id
  if (req.file) {
    const obj = {
      name: req.body.name,
      deskripsi: req.body.deskripsi,
      image: {
        data: req.file.buffer,
        contentType: 'image/png'
      }
    }
    Product.findByIdAndUpdate({ _id: id }, obj, (err) => {
      if (err) {
        req.flash('error', err)
        console.log(err)
        res.redirect('/product')
      } else {
        req.flash('success', 'Produk Berhasil Diupdate')
        res.redirect('/product')
      }
    })
  } else {
    const obj = {
      name: req.body.name,
      description: req.body.deskripsi
    }
    Product.findByIdAndUpdate({ _id: id }, obj, (err) => {
      if (err) {
        req.flash('error', err)
        console.log(err)
        res.redirect('/product')
      } else {
        req.flash('success', 'Produk Berhasil Diupdate')
        res.redirect('/product')
      }
    })
  }
}

/* ===============DELETE================== */
const deleteProduct = (req, res) => {
  const id = req.params.id
  Product.findByIdAndRemove({ _id: id }, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/product')
    } else {
      req.flash('success', 'Produk Berhasil Dihapus')
      res.redirect('/product')
    }
  })
}

module.exports = { upload, viewProduct, addProduct, updateProduct, deleteProduct }
