var assert = require('assert')
var execFile = require('child_process').execFile

function goodSpelling(cb) {
	execFile('node', ['index.js', 'hello'], { cwd: __dirname }, function (err, stdout, stderr) {
		assert.ifError(err)
		assert.equal(stderr.toString(), '')
		assert.equal(stdout.toString(), 'ok\n')

		cb()
	}).on('close', function (statusCode) {
		assert.equal(statusCode, 0)
	})
}

function badSpelling(cb) {
	execFile('node', ['index.js', 'helol'], { cwd: __dirname }, function (err, stdout, stderr) {
		assert.ok(err)
		assert.equal(stderr.toString(), '')
		assert.equal(stdout.toString(), 'not ok\n')

		cb()
	}).on('close', function (statusCode) {
		assert.equal(statusCode, 1)
	})
}

function noArgumentsPassed(cb) {
	execFile('node', ['index.js'], { cwd: __dirname }, function (err, stdout, stderr) {
		assert.ok(err)
		assert.equal(stderr.toString(), '')
		assert.equal(stdout.toString(), 'Usage: spell <word>\n')

		cb()
	}).on('close', function (statusCode) {
		assert.equal(statusCode, 1)
	})
}


goodSpelling(function () {
	badSpelling(function () {
		noArgumentsPassed(function () {
			console.log('ok')
		})
	})
})
