const Article = require('../model/article')

/* By Senna Annaba Ahmad */

/*
=============================================
              ARTICLE CONTROLLER
=============================================
*/

/*
=============================================
                    VIEW
=============================================
*/
const viewArticle = async (req, res) => {
  const username = await req.user.username
  Article.find({ author: username },
    (err, articles) => {
      if (err) {
        console.log(err)
        res.redirect('/product')
      } else {
        res.render('article', {
          articles,
          username,
          messagesuc: req.flash('success'),
          messageerr: req.flash('error')
        })
      }
    })
}
const viewArticleAdd = async (req, res) => {
  const username = await req.user.username
  res.render('articleadd', {
    username,
    messagesuc: req.flash('success'),
    messageerr: req.flash('error')
  })
}
const viewArticleUpdate = async (req, res) => {
  const id = req.params.id
  const username = await req.user.username
  Article.find({ _id: id },
    (err, article) => {
      if (err) {
        console.log(err)
        res.redirect('/article')
      } else {
        res.render('articleupdate', {
          article,
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
const addArticle = async (req, res) => {
  const username = await req.user.username
  const obj = {
    title: req.body.title,
    caption: req.body.caption,
    content: req.body.content,
    author: username
  }
  Article.create(obj, (err) => {
    if (err) {
      console.log(err)
      req.flash('error', err)
      res.redirect('/articleadd')
    } else {
      req.flash('success', 'Artikel Berhasil Ditambahkan')
      res.redirect('/article')
    }
  })
}

/* ===============UPDATE================== */
const updateArticle = (req, res) => {
  const id = req.params.id
  const obj = {
    title: req.body.title,
    caption: req.body.caption,
    content: req.body.content
  }
  Article.findByIdAndUpdate({ _id: id }, obj, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/articleupdate')
    } else {
      req.flash('success', 'Artikel Berhasil Diupdate')
      res.redirect('/article')
    }
  })
}

/* ===============DELETE================== */
const deleteArticle = (req, res) => {
  const id = req.params.id
  Article.findByIdAndRemove({ _id: id }, (err) => {
    if (err) {
      req.flash('error', err)
      console.log(err)
      res.redirect('/article')
    } else {
      req.flash('success', 'Artikel Berhasil Dihapus')
      res.redirect('/article')
    }
  })
}

module.exports = { viewArticle, viewArticleAdd, viewArticleUpdate, addArticle, updateArticle, deleteArticle }
