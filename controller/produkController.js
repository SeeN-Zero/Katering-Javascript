const multer = require('multer');
const Produk = require('../model/produk')
const fs = require('fs')
const path = require('path')

/*By Senna Annaba Ahmad*/

/*
=============================================
                MULTER SETTING
=============================================
*/
const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, 'uploads')
    },
    filename: (req, file, done) => {
        done(null, file.fieldname + '-' + Date.now())
    }
});
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
const viewDash = (req, res) => {
    Produk.find({}, (err, produks) => {
        if (err) {
            console.log(err);
        } else {
            res.render('dashboard', {produks});
        }
    })
}

const viewUpdate = (req, res) => {
    const id = req.params.id;
    Produk.find({_id: id}, (err, produk) => {
        if (err) {
            console.log(err);
        } else {
            res.render('update', {produk});
        }
    })
}

/*
=============================================
                    CRUD
=============================================
*/

/*===============ADD==================*/
const addProduk = (req, res, next) => {
    const obj = {
        name: req.body.name,
        deskripsi: req.body.deskripsi,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', 'uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Produk.create(obj, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(obj);
            res.redirect('/dash');
            fs.unlink(path.join(__dirname, '..', 'uploads/' + req.file.filename), err => {
                if (err) throw err;
                console.log("File Deleted");
            });
        }
    })
}

/*===============UPDATE==================*/
const updateProduk = (req, res, next) => {
    const id = req.params.id
    const obj = {
        name: req.body.name,
        deskripsi: req.body.deskripsi,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', 'uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(obj);
    Produk.findByIdAndUpdate({_id: id}, obj, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Terupdate");
            res.redirect('/dash');
            fs.unlink(path.join(__dirname, '..', 'uploads/' + req.file.filename), err => {
                if (err) throw err;
                console.log("File Deleted");
            });
        }
    })
}

/*===============DELETE==================*/
const deleteProduk = (req, res, next) => {
    const id = req.params.id;
    Produk.findByIdAndRemove({_id: id})
        .then(data => {
            if (!data) {
                console.log("Cannot delete");
            } else {
                console.log("Terhapus");
                res.redirect('/dash');
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
}

module.exports = {upload, viewDash, addProduk, deleteProduk, viewUpdate, updateProduk};

