const assert = require('assert');

describe('parser', () => {
	it('should parse number of lines', () => {
		const input = 
`15
`
		const otherInput = 
`10
`
		assert.equal(parse(input).lines, 15)
		assert.equal(parse(otherInput).lines, 10)
	})
	it('should parse indentation', () => {
		const input =
`15
xxxx
`
		const otherInput =
`15
yyyy
`
		assert.equal(parse(input).indentation, 'xxxx')
		assert.equal(parse(otherInput).indentation, 'yyyy')
	})

	it('should not indent first line', () => {
		const input =
`15
xxxx
VAL`
		assert.equal(parse(input).output, 'VAL')
	})
	it('should support multilines', () => {
		const input =
`15
xxxx
VAL
VAR
`
		const expected = 
`VAL
VAR
`
		assert.equal(parse(input).output, expected)
	})
	it('should indent if statement body', () => {
		const input = 
`15
xxxx
	IF !(I MOD 3) THEN
  PRINT "FIZZ"
  		ENDIF`
		const expected = 
`IF !(I MOD 3) THEN
xxxxPRINT "FIZZ"
ENDIF`
		assert.equal(parse(input).output, expected)
	})
})

function parse(input) {
	const lines = input.split('\n')
	const output = lines.slice(2).map((elem) => elem.trim())
	const indentation = lines[1]
	var indentationCount = 0
	const indentedOutout = output.map((elem, index)=> {
		if(elem.contains('ENDIF')){
			indentationCount--
		}
		const indentedLine = range(indentationCount).map((elem)=> indentation).join('') + elem

		if(elem.contains('IF')){
			indentationCount++
		} 
		return indentedLine
		}).join('\n')

	return {lines: lines[0], indentation: indentation, output: indentedOutout}
}

function range(end){
	const output = []
	for(i =0; i < end; i++ ){
		output.push(i)
	}
	return output
}

String.prototype.contains = function(it) { return this.indexOf(it) != -1 }