// Reads all titles from first 3 pages on net.tutsplus.com

var Scrapy = require("../dist/Scrapy");

var options = {
	sleep: 3000, // 3 second intervals between requests
};

var scrapy = new Scrapy(options);

scrapy.loop('http://net.tutsplus.com/page/{%i}/', { end: 3 }, function($) {

	$('.post_title a').each(function() {
		console.log( $(this).text().trim() );
	});

});



