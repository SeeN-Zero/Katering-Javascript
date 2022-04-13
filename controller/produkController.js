const multer = require('multer');
const Produk = require('../model/produk');
const Artikel = require('../model/artikel');

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
const viewProduk = async (req, res) => {
    const totProduk = await Produk.estimatedDocumentCount();
    const totArtikel = await Artikel.estimatedDocumentCount();
    const username = await req.user.username;
    Produk.find({},
        (err, produks) => {
            if (err) {
                console.log(err);
                res.redirect('/produk');
            } else {
                res.render('produk', {
                    produks, totProduk, totArtikel, username,
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

/*===============ADD==================*/
const addProduk = (req, res) => {
    const obj = {
        name: req.body.name,
        deskripsi: req.body.deskripsi,
        img: {
            data: req.file.buffer,
            contentType: 'image/png'
        }
    };
    Produk.create(obj, (err) => {
        if (err) {
            console.log(err);
            req.flash('error', err);
            res.redirect('/produk');
        } else {
            req.flash('success', 'Produk Berhasil Ditambahkan');
            res.redirect('/produk');
        }
    })
};

/*===============UPDATE==================*/
const updateProduk = (req, res) => {
    const id = req.params.id;
    if (req.file) {
        const obj = {
            name: req.body.name,
            deskripsi: req.body.deskripsi,
            img: {
                data: req.file.buffer,
                contentType: 'image/png'
            }
        };
        Produk.findByIdAndUpdate({_id: id}, obj, (err) => {
            if (err) {
                req.flash('error', err);
                console.log(err);
                res.redirect('/produk');
            } else {
                req.flash('success', 'Produk Berhasil Diupdate');
                res.redirect('/produk');
            }
        })
    } else {
        const obj = {
            name: req.body.name,
            deskripsi: req.body.deskripsi
        };
        Produk.findByIdAndUpdate({_id: id}, obj, (err) => {
            if (err) {
                req.flash('error', err);
                console.log(err);
                res.redirect('/produk');
            } else {
                req.flash('success', 'Produk Berhasil Diupdate');
                res.redirect('/produk');
            }
        })
    }
};

/*===============DELETE==================*/
const deleteProduk = (req, res) => {
    const id = req.params.id;
    Produk.findByIdAndRemove({_id: id}, (err) => {
        if (err) {
            req.flash('error', err);
            console.log(err);
            res.redirect('/produk');
        } else {
            req.flash('success', 'Produk Berhasil Dihapus');
            res.redirect('/produk');
        }
    })
};

module.exports = {upload, viewProduk, addProduk, deleteProduk, updateProduk};

