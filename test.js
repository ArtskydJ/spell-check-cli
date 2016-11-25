var test = require('tape')
var cp = require('child_process')

var opts = { cwd: __dirname }

test('Valid word: hello', function (t) {
	cp.execFile('node', ['index.js', 'hello'], opts, assertOkWord(t))
})
test('Valid word: Extremely', function (t) {
	cp.execFile('node', ['index.js', 'Extremely'], opts, assertOkWord(t))
})

test('Invalid word: helol', function (t) {
	cp.execFile('node', ['index.js', 'helol'], opts, assertNotOkWord(t))
})

test('Invalid word: lolz', function (t) {
	cp.execFile('node', ['index.js', 'lolz'], opts, assertNotOkWord(t))
})

test('No words', function (t) {
	cp.execFile('node', ['index.js'], opts, assertHelpMessage(t))
})
test('-h', function (t) {
	cp.execFile('node', ['index.js', '-h'], opts, assertHelpMessage(t))
})
test('--help', function (t) {
	cp.execFile('node', ['index.js', '--help'], opts, assertHelpMessage(t))
})

function assertOkWord(t) {
	return function (err, stdout, stderr) {
		t.ifError(err)
		t.equal(stderr.toString(), '')
		t.equal(stdout.toString(), 'ok\n')
		t.end()
	}
}

function assertNotOkWord(t) {
	return function (err, stdout, stderr) {
		t.equal(err && err.code, 1)
		t.equal(stderr.toString(), '')
		t.equal(stdout.toString(), 'not ok\n')
		t.end()
	}
}

function assertHelpMessage(t) {
	return function (err, stdout, stderr) {
		t.equal(err && err.code, 1)
		t.equal(stderr.toString(), '')
		t.equal(stdout.toString(), 'Usage: spell <word>\n')
		t.end()
	}
}
