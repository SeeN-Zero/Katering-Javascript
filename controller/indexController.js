const Page = require('../model/page')
const Product = require('../model/product')
const Article = require('../model/article')
const Review = require('../model/review')

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
  const products = await Product.find({}).exec()
  const articles = await Article.find({}).exec()
  const reviews = await Review.find({}).exec()
  const firstReview = await reviews.shift()
  const totalReview = await Review.estimatedDocumentCount()
  res.render('index', {
    page,
    products,
    articles,
    reviews,
    firstReview,
    totalReview,
    messagesuc: req.flash('success'),
    messageerr: req.flash('error')
  })
}

const articleView = async (req, res) => {
  const id = req.params.id
  const page = await Page.findOne({ setting: 'setting' }).exec()
  const article = await Article.findOne({ _id: id }).exec()
  res.render('articleview', { article, page })
}
module.exports = { viewIndex, articleView }
