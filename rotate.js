var util = require('util');
var gm = require('gm').subClass({ imageMagick: true });


// get the img data
// var imgData = require('./testImg/meta/063300.json');
// var imgPath = "testImg/063300.jpg";
// var writePath = "063300.jpg";

// rotate(
//        require('./testImg/meta/063300.json'),
//        "testImg/063300.jpg",
//        "063300.jpg"
//        );

function rotate(imgData, imgPath, writePath) {

	// x, up (out of the battery indicator)
	// y, right (opposite direction to usb port)
	// z, goes out from the camear

	var sample = imgData.acc_data.samples;

	console.log("direction : " + sample);

	var direction = {};

	direction.up = sample[0][0];
	direction.right = sample[0][1];
	direction.front = sample[0][2];

	console.log(util.inspect(direction, false,2,true));


				// 1 = Horizontal (normal)
				// 3 = Rotate 180
				// 6 = Rotate 90 CW
				// 8 = Rotate 270 CW

// -126 = -90
// -36 = -90
// -146 = -90

// 666 = -90

	var rotate = 0;
	console.log("up is: " + direction.up);

	if ( direction.up > 800 )
	{
		rotate = 180;
	}
	else if ( direction.up < -1000)
	{
		rotate = 0;
	}
	else if ( direction.up >= 0 && direction.up < 700 )
	// else if ( direction.up >= 0 && direction.up < 140 )
	{
		rotate = -90;
	}
	else if ( direction.up >= 140 )
	{
		rotate = 90;
	}

	console.log("rotate this: " + rotate);

	// DEBUG - add up and rotate to the filename to see what it should be doing
	//writePath = writePath + ".u" + direction.up + ".R" + rotate + ".jpg";

	//http://stackoverflow.com/questions/8532575/how-does-node-imagemagick-compare-to-node-gm
	gm(imgPath)
	// .flip()
	// .magnify()
	.rotate('white', rotate)
	// .blur(7, 3)
	// .edge(3)
	.write(writePath, function (err) {
		if (err) {
			console.log("error");
			console.log(util.inspect(err, false,2,true));

		  	return false;
		}
			console.log('crazytown has arrived');
	});
}

exports.rotate = rotate;
