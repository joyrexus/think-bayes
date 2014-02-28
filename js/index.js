
// create a new pmf
// the probability that a discrete random variable is exactly equal to some value.
module.exports = function pmf(hypos){
  var pmf = function(){ }
  // see: http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/
  // for why we're not just doing `hash = {}`

  // hash of the hypotheses -> probabilities
  var hash = Object.create(null)

  if(arguments.length){
    hypos.forEach(function(hypo){
      hash[hypo] = 1 / hypos.length // normalize now
    })
  }

  pmf.prob = function(key, val){
    // set the value
    if(val !== undefined){ hash[key] = val; return pmf }
    // get the value
    else return hash[key]
  }
  // increment the probability of some outcome
  pmf.inc = function(key, val){
    if(!hash[key]) hash[key] = 0
    hash[key] += val
    return pmf
  }
  pmf.multi = function(key, multiplier){
    pmf.prob(key, pmf.prob(key) * multiplier)
    return pmf
  }
  var likelihood = Number
  pmf.likelihood = function(func){
    if(!arguments.length) return likelihood
    likelihood = func
    return pmf
  }
  pmf.update = function(data){
    pmf.hypos().forEach(function(hypo){
      var likely = likelihood(data, hypo)
      pmf.multi(hypo, likely)
    })
    pmf.normalize()
    return pmf
  }
  pmf.hypos = function(hypos){
    if(!arguments.length) return Object.keys(hash)
    pmf.empty()
    hypos.forEach(function(hypo){ hash[hypo] = 1 / hypos.length })
    return pmf
  }
  pmf.empty = function(){ hash = Object.create(null); return pmf }
  pmf.map = function(func){
    pmf.hypos().forEach(function(key){
      hash[key] = func(key, hash[key])
    })
    return pmf
  }
  pmf.each = function(func){
    pmf.hypos().forEach(function(key){ func(key, hash[key]) })
  }
  pmf.total = function(){
    var total = 0
    pmf.each(function(key, val){ total += val })
    return total
  }
  pmf.normalize = function(){
    var total = pmf.total()
    pmf.map(function(key, val){ return val / total })
    return pmf
  }
  pmf.toJSON = function(){
    return hash
  }
  pmf.toString = function(){
    return '' + JSON.stringify(hash)
  }
  return pmf
}
