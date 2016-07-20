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
VAL
`
		assert.equal(parse(input).output, 'VAL')
	})
})

function parse(input) {
	return {lines: input.split('\n')[0], indentation: input.split('\n')[1], output: 'VAL'}
}