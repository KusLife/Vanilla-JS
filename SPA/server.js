const express = require('express')
const path = require('path')

const app = express()


// Midleweare to serve all routs starts of '/sataic' 
app.use('/static', express.static(path.resolve('frontend', 'static')))

// Any route is sended to index.html and then look for a match
app.get('/*', (req, res) => {
    res.sendFile(path.resolve('frontend', 'index.html'))
})

// As I've checked, port is matter but not bounded with launch.json file 
app.listen(process.env.PORT || 6060, () => console.log('Server running well...'))
