const Page = require('../model/page');
const Produk = require('../model/produk');
const Artikel = require('../model/artikel');

/*By Senna Annaba Ahmad*/

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
    Page.find({setting: "setting"},
        (err, page) => {
            if (err) {
                console.log(err);
            } else {
                Produk.find({},
                    (err, produks) => {
                        if (err) {
                            console.log(err);
                        } else {
                            Artikel.find({},
                                (err, artikels) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('index', {
                                            produks, page, artikels
                                        })
                                    }
                                });
                        }
                    });
            }
        }
    )
};

const artikelBlogView = (req, res) => {
    const id = req.params.id;
    Page.find({setting: "setting"},
        (err, page) => {
            if (err) {
                console.log(err);
            } else {
                Artikel.find({_id: id},
                    (err, artikel) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('artikelBlogView', {artikel, page})
                        }
                    })
            }
        });
}
module.exports = {viewIndex, artikelBlogView};