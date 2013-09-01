// Getting titles of google.com and apple.com

var Scrapy = require("../dist/Scrapy");

var scrapy = new Scrapy({debug: true});

scrapy.get('http://www.google.com/', function($) {
	console.log( 'Page title:', $('title').text() );
});

scrapy.get('http://www.apple.com/', function($) {
	console.log( 'Page title:', $('title').text() );
});	
