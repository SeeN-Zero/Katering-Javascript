const multer = require('multer');
const Page = require('../model/page');

/*By Senna Annaba Ahmad*/

/*
=============================================
                MULTER SETTING
=============================================
*/
const storage = multer.memoryStorage()
const upload = multer({storage: storage});

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
    const username = await req.user.username;
    Page.findOne({setting: "setting"},
        (err, page) => {
            if (err) {
                console.log(err);
                res.redirect('/pageSetting');
            } else {
                res.render('pageSetting', {
                    page, username,
                    messagesuc: req.flash('success'),
                    messageerr: req.flash('error')
                });
            }
        })
};
/*
=============================================
                    CRUD
=============================================
*/

/*===============UPDATE==================*/
const updatePage = (req, res) => {
    const id = req.params.id;
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
            alamat: req.body.alamat,
            hp: req.body.hp
        };
        Page.findOneAndUpdate({setting: id}, obj, (err) => {
            if (err) {
                req.flash('error', err);
                console.log(err);
                res.redirect('/pageSetting');
            } else {
                req.flash('success', 'Halaman Utama Berhasil Diupdate');
                res.redirect('/pageSetting');
            }
        })
    } else {
        const obj = {
            title: req.body.title,
            header: req.body.header,
            subheader: req.body.subheader,
            about: req.body.about,
            alamat: req.body.alamat,
            hp: req.body.hp
        };
        console.log(obj);
        Page.findOneAndUpdate({setting: id}, obj, (err) => {
            if (err) {
                req.flash('error', err);
                console.log(err);
                res.redirect('/pageSetting');
            } else {
                req.flash('success', 'Halaman Utama Berhasil Diupdate');
                res.redirect('/pageSetting');
            }
        })
    }
};
module.exports = {upload, viewPageSetting, updatePage};