const express = require('express')
const app = express()
const db = require('./config/connection');
const PORT = process.env.PORT || 3002
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const routes = require('./routes')
app.use(routes)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});