
var Scrapy = require("../dist/scrapy");
var connect = require('connect');

var server = connect.createServer(
    connect.static(__dirname)
).listen(8080);


module.exports = {

	testObject: function(test) {

		new Scrapy({}, function(bot) {

			test.expect(3);

			test.equal( typeof bot , 'object' );
			test.equal( typeof bot.get , 'function' );
			test.equal( typeof bot.loop , 'function' );

			test.done();

		});

	},

	testGet: function(test) {

		new Scrapy({}, function(bot) {
			bot.get('http://127.0.0.1:8080/pages/index.html', function($) {
				test.equal( $('title').text() , 'Success!');
				test.done();
			});
		});

	},

	testLoop: function(test) {

		new Scrapy({sleep: 10}, function(bot) {

			test.expect(6);

			var ran = 0;

			bot.loop('http://127.0.0.1:8080/pages/page_{%i}.html', { end: 3 }, function($) {

				/_(\d+)\./.test(this.url);

				var id = RegExp.$1;

				test.equal(typeof $, 'function');
				test.equal( $('title').text() , 'Page ' + id );
				
				if (++ran == 3) {
					test.done();
				}				

			});

		});		

	},

	testExit: function(test) {
		server.close();
		test.done();
	}
	
}

