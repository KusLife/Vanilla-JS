const express = require('express')
const path = require('path')

const app = express()


// Midleweare to serve all routs starts of '/sataic' 
// app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))

// Any route is sended to index.html and then look for a match
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("frontend", "index.html"))
})

app.listen(process.env.PORT || 5050, () => console.log('Server running...'))
