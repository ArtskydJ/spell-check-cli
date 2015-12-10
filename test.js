var assert = require('assert')
var execFile = require('child_process').execFile

execFile('node', ['index.js', 'hello'], { cwd: __dirname }, function (err, stdout, stderr) {
	assert.ifError(err)
	assert.equal(stderr.toString(), '')
	assert.equal(stdout.toString(), 'ok\n')

	execFile('node', ['index.js', 'helol'], { cwd: __dirname }, function (err, stdout, stderr) {
		assert.ifError(err)
		assert.equal(stderr.toString(), '')
		assert.equal(stdout.toString(), 'not ok\n')

		console.log('ok')
	})
})
