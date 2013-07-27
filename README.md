# Scrapy

Scrapy is simple node.js module for crawling web pages.
Scrapy uses [cheerio](https://github.com/MatthewMueller/cheerio) as replacement for jQuery 
and [async](https://github.com/caolan/async) for asynchronous page requests.


## Initialize Scrapy 
	new Scrapy(options, function(crawler) {
		// your code goes here
	});
#### Available options
Options is an object. Use `null` or `{}` for no options
- `sleep` (default: 1000) - time in ms between requests
- `concurrency` (default: 1) - number of simultaneous requests
- `debug` (default: false) - show some debug information in console

#### Callback
All logic happens in this callback. First argument is an instance of Scrapy containing multiple methods for crawling web.

### Currently available methods are

##### get(url, callback)
Accepts two arguments. URL of a page to download and a callback

	crawler.get('http://www.google.com', function($) {
		console.log('This page\'s title is: ', $('title').text());
	});

##### loop(url, options, callback)
Accepts three arguments - URL, loop options and a callback. This methods allows to loop through pages with specific conditions. URL has to contain `{%s}` wich will be replaced with number. Loop options are:
- `start` (default: 1) - start page
- `step` (default: 1) - number by wich increase the number
- `end` (default: false) - when to end the loop
- `while` (default: false) - can be a regexp (tested against page content), function (expects return of true or false) or a string (jQuery like selector. If no elements are found, loop stops). If set, loop will continue until `while` condition is not met. 

Example: retrieve article titles of first 5 pages on net.tutsplus.com
	
	crawler.loop('http://net.tutsplus.com/page/{%i}/', { end: 5 }, function($) {

		$('.post_title a').each(function() {
			console.log( $(this).text().trim() );
		});

	});


# Full example

	var Scrapy = require("../dist/Scrapy");
	
	new Scrapy({}, function(crawler) {
	
		crawler.loop('http://net.tutsplus.com/page/{%i}/', { end: 5 }, function($) {
	
			$('.post_title a').each(function() {
				console.log( $(this).text().trim() );
			});
	
		});
	
	});
	
More examples in `examples` folder.

### TODO
- tests
- proper documentation
- code cleanup


