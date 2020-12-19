const cors = require('cors')
const config = require('./config')
const router = require('./router');
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())

// Routes
router(app);

// Database connections
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${config.mongoUri}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

app.listen(config.port, () => {
  console.log(`Listening in http://localhost:${config.port}`)
})