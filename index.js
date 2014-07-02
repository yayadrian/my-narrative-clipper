var rotater = require('./rotate.js');
var fs = require('fs');
var walk = require('walk');
var pathIn = "./27/";
var pathOut = "./27/output/";
var options;

options = {
	followLinks: false,
	// directories with these keys will be skipped
	filters: ["meta", "output"]
};

walker = walk.walk(pathIn, options);

	walker.on("file", function (root, fileStats, next) {
		fs.readFile(fileStats.name, function () {
			// doStuff
			// console.log(fileStats);
			var fileAry = fileStats.name.split('.');
			var file = {
				full: fileStats.name,
				name: fileAry[0],
				ext: fileAry[1]
			};
			if(file.ext === "jpg") {
				processImg(file);
			}

			next();
		});
	});

function processImg(file) {
	console.log("Files");
	console.log(file);

	var jsonPath = pathIn + '/meta/' + file.name + '.json';

	fs.exists(jsonPath, function (exists) {
		if(exists) {
			rotater.rotate(
				require(jsonPath),
				pathIn + file.full,
				pathOut + file.full
			);
		} else {
			copyFile(pathIn + file.full, pathOut + file.full, function(err){
				if(err) {
					console.log("ERROR copying file");
					console.log(err);
				}
			});
		}
	});
}

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", done);

  var wr = fs.createWriteStream(target);
  wr.on("error", done);
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}