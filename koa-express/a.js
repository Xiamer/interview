const express = require('express')

const app = express()

const sleep = (mseconds) => new Promise((resolve) => setTimeout(() => {
  console.log('sleep timeout...')
  resolve()
}, mseconds))

app.use(async (req, res, next) => {
  console.log('I am the first middleware')
  const startTime = Date.now()
  console.log(`================ start ${req.method} ${req.url}`, { query: req.query, body: req.body });
  next()
  const cost = Date.now() - startTime
  console.log(`================ end ${req.method} ${req.url} ${res.statusCode} - ${cost} ms`)
})
app.use((req, res, next) => {
  console.log('I am the second middleware')
  next()
  console.log('second middleware end calling')
})
app.get('/api/test1', async (req, res, next) => {
  console.log('I am the router middleware => /api/test1')
  await sleep(2000)
  res.status(200).send('hello')
})
app.listen(3000)
console.log('server listening at port 3000')

// I am the first middleware
// ================ start GET /api/test1
// I am the second middleware
// I am the router middleware => /api/test1
// second middleware end calling
// ================ end GET /api/test1 200 - 3 ms
// sleep timeout...






