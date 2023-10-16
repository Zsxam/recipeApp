const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('Hello, ini adalah halaman About!')
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404<h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})