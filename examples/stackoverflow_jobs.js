// Get latest "php" job titles and tags from careers.stackoverflow.com

var Scrapy = require("../dist/Scrapy");

new Scrapy({ debug: true }, function(crawler) {

	// config
	var base = 'http://careers.stackoverflow.com',
		url = base + '/jobs?searchTerm=php&location=&sort=p&pg={%i}',
		jobs = [];

	// parses single job
	var job_parser = function($) {
		
		// read tags
		var tags = [];
		$('#tags a').each(function() {
			tags.push( $(this).text() );
		});

		// job data
		var job = {
			title: $('h1').text().trim(), // read job title
			tags: tags.join(', '), // join all tags in nice string
		};

		// add job to array
		jobs.push(job);

		// output to console
		console.log(job);

	};

	// go through pages while there is a "next" link 
	crawler.loop(url, { "while": />next<\/a>/ }, function($, i) {

		$('h3 a').each(function() {

			// add base to url
			var job_url = base + $(this).attr('href');

			crawler.get(job_url, job_parser);

		});	

	});

});



