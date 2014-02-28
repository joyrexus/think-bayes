var PMF = require('../index.js')

var prob = PMF()
  .prob('Bowl 1', 0.5)
  .prob('Bowl 2', 0.5)
  // multiply each hypothesis by their likelihood given the observation
  // you'll normally want to do this using the a `likelihood` accessor and 
  // `update` functions
  .multi('Bowl 1', 0.75)
  .multi('Bowl 2', 0.5)
  .normalize()

console.log('probability', prob)
