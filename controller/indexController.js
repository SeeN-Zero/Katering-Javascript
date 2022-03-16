const Page = require('../model/page');
const Produk = require('../model/produk')

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
    Page.find({setting: "setting"}, (err, page) => {
        if (err) {
            console.log(err);
        } else {
            Produk.find({},
                (err, produks) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('index', {
                            produks, page
                        });
                    }
                })
        }
    })
}
module.exports = {viewIndex};