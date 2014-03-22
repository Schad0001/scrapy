var Scrapy = require("../dist/scrapy");
var connect = require('connect');

var server = connect.createServer(
    connect.static(__dirname)
).listen(8080);

module.exports = {

    testObject: function(test) {

        var scrapy = new Scrapy();

        test.expect(3);

        test.equal( typeof scrapy , 'object' );
        test.equal( typeof scrapy.get , 'function' );
        test.equal( typeof scrapy.loop , 'function' );

        test.done();

    },

    testGet: function(test) {

        var scrapy = new Scrapy();

        scrapy.get('http://127.0.0.1:8080/pages/index.html', function($) {
            test.equal( $('title').text() , 'Success!');
            test.done();
        });

    },

    testLoop: function(test) {

        var scrapy = new Scrapy();

        test.expect(6);

        var ran = 0;

        scrapy.loop('http://127.0.0.1:8080/pages/page_{%i}.html', { end: 3 }, function($) {

            /_(\d+)\./.test(this.url);

            var id = RegExp.$1;

            test.equal(typeof $, 'function');
            test.equal( $('title').text() , 'Page ' + id );

            if (++ran == 3) {
                test.done();
            }

        });

    },

    testExit: function(test) {
        server.close();
        test.done();
    }

}

