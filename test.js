var assert = require('assert')
var cp = require('child_process')

cp.execFile('node', ['index.js', 'hello'], { cwd: __dirname }, function (err, stdout, stderr) {
	assert.ifError(err)
	assert.equal(stderr.toString(), '')
	assert.equal(stdout.toString(), 'ok\n')
	finish()
})

cp.execFile('node', ['index.js', 'helol'], { cwd: __dirname }, function (err, stdout, stderr) {
	assert.ok(err)
	assert.equal(err.code, 1)
	assert.equal(stderr.toString(), '')
	assert.equal(stdout.toString(), 'not ok\n')
	finish()
})

cp.execFile('node', ['index.js'], { cwd: __dirname }, function (err, stdout, stderr) {
	assert.ok(err)
	assert.equal(err.code, 1)
	assert.equal(stderr.toString(), '')
	assert.equal(stdout.toString(), 'Usage: spell <word>\n')
	finish()
})

var finishedCount = 0
function finish() {
	if (++finishedCount >= 3) console.log('ok')
}
