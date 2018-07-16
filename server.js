var express = require('express');
var path = require('path');
var server = express();
const fs = require('fs');


var multer = require('multer');

server.use(express.static(path.join(__dirname, 'public')))

//configure to use body parser
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();

//handling file uploads
var trainStorage = multer.diskStorage({
	destination: function(req, file, callback) {
		console.log(file);
		callback(null, './data/train')
	},
	filename: function(req, file, callback) {
		console.log(file.originalname + ' uploaded successfully...');
        callback(null, file.originalname )
	}
})
var uploadTrainFile = multer({storage: trainStorage});
server.post('/api/upload-file/train', uploadTrainFile.single('file'), function(req, res, next){
    res.end('File is uploaded');
});

var testStorage = multer.diskStorage({
	destination: function(req, file, callback) {
		console.log(file);
		callback(null, './data/test')
	},
	filename: function(req, file, callback) {
		console.log(file.originalname + ' uploaded successfully...');
        callback(null, file.originalname )
	}
})
var uploadTestFile = multer({storage: testStorage});
server.post('/api/upload-file/test', uploadTestFile.single('file'), function(req, res, next){
    res.end('File is uploaded');
});
//end of file uploads

//api to get test file names
server.get('/api/testfilelist', function(req, res, next){
	const testFolder = './data/test/';	
	fs.readdir(testFolder, (err, files) => {
		//console.log(files);
		res.send(files);
	})
});

//api to get train file names
server.get('/api/trainfilelist', function(req, res, next){
	const trainFolder = './data/train/';	
	fs.readdir(trainFolder, (err, files) => {
		//console.log(files);
		res.send(files);
	})
});

//api to get file header

server.post('/api/getheader', jsonParser, function(req, res, next){
	let sFileName = req.body.filename;
	var LineByLineReader = require('line-by-line');
	var lr = new LineByLineReader('./data/train/' + sFileName);
	lr.on('error', function (err) {
		console.log(err);
	});
	lr.on('line', function (line) {
		res.send([line]);
		lr.close();
	});
	lr.on('end', function () {
		// All lines are read, file is closed now.
	});
	
});

//handling call to python program
// server.post('/api/analyze',jsonParser, function(req, res, next){
// 	res.end(JSON.stringify(req.body, null, 2));
// })

server.post('/api/analyze', jsonParser,function(req, res, next){
	console.log('yet to run python prog');
	//console.log(req.body);
	// var arg1 = "creditlimit_train.csv";
	// var arg2 = "creditlimit_test.csv";
	// var arg3 = ["Salary","LoanAmt"];
	// var arg4 = ["Level"];
	var arg1 = req.body.trainFile;
	var arg2 = req.body.testFile;
	var arg3 = [req.body.req_param];
	var arg4 = [req.body.res_param];
	console.log(arg1, arg2, arg3, arg4);
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
	var sampleResult=`    SNo   Salary  LoanAmt        Actual     predicted
	129   700000    63756     Low Level  Medium Level
	136   406000   406000     Low Level  Medium Level
	184  1400000   348600  Medium Level    High Level
	`;
	res.end(sampleResult);
});
// end of analyze

server.listen(3000, ()=> console.log('app is running at http://localhost:3000/index.html'));