// Getting titles of google.com and apple.com

var Scrapy = require("../dist/Scrapy");

var options = {
	debug: true
};

new Scrapy(options, function(crawler) {

	this.get('http://www.google.com/', function($) {
		console.log( 'Page title:', $('title').text() );
	});

	this.get('http://www.apple.com/', function($) {
		console.log( 'Page title:', $('title').text() );
	});	

});



