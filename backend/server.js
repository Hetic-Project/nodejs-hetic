import express from 'express'

const app = express()
const port = "3001"

router.get("/", function (req, res, next) {
    res.send("Root")
  })

app.listen(port, () => 
    console.log(`App running on port ${port}`)
)
