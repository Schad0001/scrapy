// Reads all titles from first 3 pages on net.tutsplus.com

var Scrapy = require("../dist/Scrapy");

var options = {
	sleep: 3000, // 3 second intervals between requests
};

new Scrapy(options, function(crawler) {

	crawler.loop('http://net.tutsplus.com/page/{%i}/', { end: 5 }, function($) {

		$('.post_title a').each(function() {
			console.log( $(this).text().trim() );
		});

	});

});



