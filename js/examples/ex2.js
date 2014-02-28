var PMF = require('../index.js')

var pmf = PMF(['heads', 'tails'])

console.log('the probability of heads: ', pmf.prob('heads'))
console.log('the probability of tails: ', pmf.prob('tails'))