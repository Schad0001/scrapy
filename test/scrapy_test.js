
module.exports = {

	setUp: function(callback) {
		callback();
	},

	test: function(test) {
		test.equal(1, 1);
		test.done();
	}

}