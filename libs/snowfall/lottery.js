var Timerr;
$('.banner').snowfall('clear');
clearInterval(Timerr);
$('.banner').snowfall('clear');
$('.banner').snowfall({
	image: [
		"./images/b1.png",
		"./images/b2.png",
		"./images/b3.png",
		"./images/b4.png",
		"./images/b5.png",
		"./images/b6.png",
		"./images/b7.png",
		"./images/b8.png",
		"./images/b9.png",
		"./images/b10.png",
		"./images/b11.png",

	],
	flakeCount: 25,
	minSize: 25,
	maxSize: 30
});