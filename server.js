var express = require('express');
var path = require('path');
var server = express();

var multer = require('multer');

server.use(express.static(path.join(__dirname, 'public')))

//hadling file uploads
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './data')
	},
	filename: function(req, file, callback) {
		console.log(file)
        callback(null, file.originalname )
        // +  path.extname(file.originalname)
	}
})
var upload = multer({storage: storage});
server.post('/api/upload-file', upload.single('file'), function(req, res, next){
    res.end('File is uploaded');
});

server.listen(3000, ()=> console.log('app is running at http://localhost:3000/index.html'));