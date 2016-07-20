const assert = require('assert');

describe('parser', () => {
	const input = `
15
`
	const otherInput = `
10
`
	it('should parse number of lines', () => {
		assert.deepEqual(parse(input), {lines: 15});
		assert.deepEqual(parse(otherInput), {lines: 10})
	})
})

function parse(input) {
	return {lines: input.split('\n')[1]}
}