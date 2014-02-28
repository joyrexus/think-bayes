// the D&D problem
// assume there are 5 types of dice, 4, 6, 8, 12, and 20 sided, in a bag.
// one is pulled out at random and rolled. it shows a 6.
// what's the probability that each dice was rolled?

var PMF = require('../index.js')
var pmf = PMF()
  .hypos(['4', '6', '8', '12', '20'])
  // write our likelihood function...
  .likelihood(function(data, hypo){
    if(data <= hypo) return 1 / hypo
    else return 0
  })
  // update our hypos based on our observation

console.log('pmf before', pmf.toString())
pmf.update(22)
console.log('pmf after', pmf.toString())