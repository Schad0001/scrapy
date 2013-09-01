# Scrapy

Scrapy is simple node.js module for crawling web pages. 
Scrapy uses [cheerio](https://github.com/MatthewMueller/cheerio) as replacement for jQuery 
and [async](https://github.com/caolan/async) for asynchronous page requests.

## Usage
Create a new instance of Scrapy. 

	var scrapy = new Scrapy(options);
	
### Options
Options are optional. Available options are:
- `sleep` (default: 1000) - time in ms between requests
- `concurrency` (default: 1) - number of simultaneous requests
- `debug` (default: false) - show some debug information in console


## Available methods

### get(url, callback)
Accepts two arguments. URL of a page to download and a callback. Returns a [cheerio](https://github.com/MatthewMueller/cheerio)
object as first argument

	var scrapy = new Scrapy();

	scrapy.get('http://www.google.com', function($) {
		console.log('This page\'s title is: ', $('title').text());
	});
	

### loop(url, options, callback)
Accepts three arguments - URL, loop options and a callback. 
This methods allows to loop through pages with specific conditions. URL has to contain `{%i}` wich will be replaced with number. Loop options are:
- `start` (default: 1) - start page
- `step` (default: 1) - number by wich increase the iterator
- `end` (default: false) - when to end the loop
- `while` (default: false) - can be a regexp (tested against page content), function (expects return of true or false) or a string (jQuery like selector. If no elements are found, loop stops). If set, loop will continue until `while` condition is not met. 

#### Example
Retrieve article titles of first 5 pages on net.tutsplus.com

	var scrapy = new Scrapy();
	
	scrapy.loop('http://net.tutsplus.com/page/{%i}/', { end: 5 }, function($) {

		$('.post_title a').each(function() {
			console.log( $(this).text().trim() );
		});

	});



More examples in `examples` folder.


### TODO
- more tests
- proper documentation
- code cleanup


