var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  var d = new Date()
  console.log("[",d.toLocaleTimeString() + " - " + d.toLocaleDateString(),"] ")
  next()
})
// define the home page route
router.get('/', function (req, res) {
  dbMissions.find({}, function (err, docs) {
  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
  res.json(docs)
});

})

module.exports = router
