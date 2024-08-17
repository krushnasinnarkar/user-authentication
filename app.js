require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

const allowlist = ['http://localhost:5000/']
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}
app.use(cors(corsOptionsDelegate))

app.get('/', (req, res) => {
  res.send('<h1>User Auth</h1>');
});

// routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/ep', authenticateUser, routerWhichRequireAuthentication);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
