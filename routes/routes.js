const express = require('express')
const router = express.Router()
const { viewReview, getCode, addReview, deleteReview } = require('../controller/reviewController')
const { upload, viewProduct, addProduct, updateProduct, deleteProduct } = require('../controller/productController')
const { viewPageSetting, updatePage } = require('../controller/pageController')
const { viewIndex, articleView } = require('../controller/indexController')
const { authView, auth, updateUserView, updateUser, logout } = require('../controller/authController')
const { protectRoute, redirectRoute } = require('../auth/authview')
const { viewArticle, viewArticleAdd, viewArticleUpdate, addArticle, updateArticle, deleteArticle } = require('../controller/articleController')

/*
=============================================
              ARTICLE ROUTE
=============================================
*/
router.get('/article', protectRoute, viewArticle)
router.get('/articleadd', protectRoute, viewArticleAdd)
router.get('/articleupdate/:id', protectRoute, viewArticleUpdate)
router.post('/article/update/:id', protectRoute, updateArticle)
router.post('/article/add', protectRoute, addArticle)
router.get('/article/delete/:id', protectRoute, deleteArticle)
/*
=============================================
            AUTHENTICATION ROUTE
=============================================
*/
router.get('/auth', redirectRoute, authView)
router.post('/auth', redirectRoute, auth)
router.get('/accountsetting', protectRoute, updateUserView)
router.post('/accountsetting', protectRoute, updateUser)
router.post('/logout', protectRoute, logout)
/*
=============================================
            INDEX ROUTE
=============================================
*/
router.get('/', viewIndex)
router.get('/article/:id', articleView)
/*
=============================================
            PAGE SETTING ROUTE
=============================================
*/
router.get('/pagesetting', protectRoute, viewPageSetting)
router.post('/pagesetting/update/:id', protectRoute, upload.single('logo'), updatePage)
/*
=============================================
            PRODUCT ROUTE
=============================================
*/
router.get('/product', protectRoute, viewProduct)
router.post('/product/add', protectRoute, upload.single('image'), addProduct)
router.post('/product/update/:id', protectRoute, upload.single('image'), updateProduct)
router.get('/product/delete/:id', protectRoute, deleteProduct)
/*
=============================================
            REVIEW ROUTE
=============================================
*/router.get('/review', protectRoute, viewReview)
router.post('/review/add', addReview)
router.get('/review/delete/:id', protectRoute, deleteReview)

router.get('/token', protectRoute, getCode)

module.exports = router
