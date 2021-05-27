const express = require('express');
var multer = require('multer');
const path = require('path');
const app = express();

// const uploadFile = require('./uploadFile');

const port = 3000 || process.env.port;

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/file')
    },
    filename: function(req, file, cb) {
        cb(null, 'avatar' + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
})

app.use(express.static('public'));


app.post('/file', upload.single('file'), function(req, res, next) {
    console.log(req.file);
    res.json({ success: true })
})
app.post('/file/multiple', upload.array('file'), function(req, res, next) {
    console.log(req.files);
    res.json({ success: true })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})