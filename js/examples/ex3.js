// the cookie problem
// there are two bowls of cookies
// bowl 1 contains 30 vanilla cookies and 10 chocolate cookies
// bowl 2 contains 20 each
// say you pull a cookie out of one at random and it's a vanilla cookie,
// whats the probability to came from bowl 1?

var PMF = require('../index.js')
var pmf = PMF()
  .hypos(['Bowl 1', 'Bowl 2'])
  // write our likelihood function...
  .likelihood(function(data, hypo){
    var mixes = {
        'Bowl 1': { vanilla: 0.75, chocolate: 0.25 }
      , 'Bowl 2': { vanilla: 0.5, chocolate: 0.5 }
    }
    return mixes[hypo][data]
  })
  // update our hypos based on our observation

console.log('pmf before', pmf.toString())
pmf.update('vanilla')
console.log('pmf after', pmf.toString())