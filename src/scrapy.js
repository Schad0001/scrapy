/* global require */
/* global console */

var nom = require('nom');
var async = require('async');
var sugar = requre('sugar');

var Scrapy = function(options, callback) {

    // this is that
    var self = this;

    // default options
    this.options = {
        concurrency: 1, // simultaneous requests
        sleep: 1000, // time interval between requests
        debug: false // output some information
    };

    // default loop options
    this._loop_options = {
        start: 1,
        end: false,
        while: false,
        step: 1
    };

    // override default options
    this.options = Object.merge(this.options, options);

    // initialize async queue
    this._queue = async.queue(function(options, done) {

        self.debug('Downloading:', options.url);

        // load the page
        nom(options.url, function(err, $) {

            if (err) throw err;

            // execute a callback
            options.callback.call({ url: options.url, content : $.html() }, $);

            // wait a little before next request
            setTimeout(done, self.options.sleep);
        });

    }, this.options.concurrency);

    // loop step. executed on every loop cycle
    this._loop_step = function(url, config, callback) {

        var stop = false, current = config.current;

        // set current place
        config.current += config.step;

        // add new task to queue
        this._queue.push({
            url: url.replace('{%i}', current), // url with replaced iterator
            callback: function($) {

                // check while condition
                if (config['while'] !== false && current > 1) {

                    // type of while condition
                    var type = typeof config['while'];

                    // check condition depending on while type
                    if (type === 'function' && ! config['while']($, current)) {
                        stop = true;
                    }
                    else if (type === 'object' && ! config['while'].test($.html())) {
                        stop = true;
                    }
                    else if (type === 'string' && ! $(config['while']).length) {
                        stop = true;
                    }

                }

                // check end condition
                if (config.end !== false && config.current > config.end) {
                    stop = true;
                }

                // call user loop callback
                callback.call(this, $, config.current - 1);

                // if no conditions are met, continue loop
                if ( ! stop) {
                    self._loop_step(url, config, callback);
                }

            }
        });

    };

    // Output debug information
    this.debug = function() {
        if (this.options.debug) {
            console.log(arguments[0], arguments[1]);
        }
    };

    // add page download to queue
    this.get = function(url, callback) {
        this._queue.push({
            url: url,
            callback: callback
        });
    };

    // start a loop with conditions
    this.loop = function(url, options, callback) {

        // default options
        var config = this._loop_options;

        // override user options
        for (var attr in options) {
            config[attr] = options[attr];
        }

        // set current page to start
        config.current = config.start;

        // start a loop
        this._loop_step(url, config, callback);

    };

    // return this instance
    return this;
};


exports = module.exports = Scrapy;

