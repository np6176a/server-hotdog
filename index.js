const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
  res.send(`PORT ${port}`)
})

app.listen(port, (err) => {
  if (err) { console.log(err) }
  console.log('Listening on port ' + port)
})
