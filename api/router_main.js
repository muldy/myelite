var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  var d = new Date()
  console.log('Time: ', d.toLocaleTimeString() + " - " + d.toLocaleDateString())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  //res.render('home');
  res.render('home');
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
