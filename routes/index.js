const express = require('express')//1.i we create a route for our pages here with router and export to app.js
const router = express.Router()
const app = express();
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const AirDrop = require('../models/airdrops')

// description login/landing page
// route GET/
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'//k.3 we specfy which views get each layout by adding an object called layout and a string containing our layout name inside our routes file for the specific route that needs that layout
    })//2.iwe use .render to check for templates or views with that name and display them
})
// description dashboard
// route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const airdrops = await AirDrop.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName, 
            airdrops,
           
        }),  console.log(AirDrop.createdAt)
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

})


module.exports = router