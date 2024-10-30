const express = require('express')

const app = express()
const port = "3001"

app.get("/", (req, res, next) => {
    res.send("Root")
})

app.listen(port, () => 
    console.log(`App running on port ${port}`)
)
