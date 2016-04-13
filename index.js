#!/usr/bin/env node
var enUS = require('dictionary-en-us')
var Spellchecker = require('hunspell-spellchecker')

var word = process.argv[2]
if (!word || word[0] === '-') {
	console.log('Usage: spell <word>')
	process.exit(1)
}

enUS(function (err, dictionaries) {
	if (err) throw err

	var spellchecker = new Spellchecker()
	spellchecker.use(spellchecker.parse(dictionaries))

	var ok = spellchecker.check(word)
	console.log(ok ? 'ok' : 'not ok')
	process.exit(ok ? 0 : 1)
})
