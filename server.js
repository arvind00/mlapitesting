var express = require('express');
var path = require('path');
var server = express();

var multer = require('multer');

server.use(express.static(path.join(__dirname, 'public')))

//handling file uploads
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './data')
	},
	filename: function(req, file, callback) {
		console.log(file.originalname + ' uploaded successfully...');
        callback(null, file.originalname )
	}
})
var upload = multer({storage: storage});
server.post('/api/upload-file', upload.single('file'), function(req, res, next){
    res.end('File is uploaded');
});

//end of file uploads

//handling call to python program
// var bodyParser = require('body-parser');
// // create application/json parser
// var jsonParser = bodyParser.json();
// server.post('/api/analyze',jsonParser, function(req, res, next){
// 	res.end(JSON.stringify(req.body, null, 2));
// })

server.post('/api/analyze', function(req, res, next){
	console.log('yet to run python prog');
	console.log(req);
	res.end('success');
	// const { spawn } = require('child_process');
	// const pyProg = spawn('python', ['./sample.py', arg1, arg2, arg3, arg3]);
	// // in the python program access the args as sys.argv[1]
	// // To send data back to node just do the following in the python script:
	// // print(dataToSendBack)
	// // sys.stdout.flush()

    // pyProg.stdout.on('data', function(data) {
    //     console.log(data.toString());
    //     res.write(data);
    //     res.end(data.toString());
    // });

});

server.listen(3000, ()=> console.log('app is running at http://localhost:3000/index.html'));