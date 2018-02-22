var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  var d = new Date()
  console.log('Time: ', d.toLocaleTimeString() + " - " + d.toLocaleDateString())
  next()
})
router.get('/nav_home', function (req, res) {
  //res.render('home');
  res.render('home');
})
// define the home page route
router.get('/nav_missions', function (req, res) {
  dbMissions.find({}).sort({ DestinationSystem: 1, DestinationStation: 1 }).exec(function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    //res.json(docs)//res.render('home');
    res.render('missions',{docs:JSON.stringify(docs,null,4),content:docs});
  });
  //res.render('missions',{docs:"docs"});
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
