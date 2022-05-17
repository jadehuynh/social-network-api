const express = require('express')
const app = express()

const PORT = process.env.PORT || 3002
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
