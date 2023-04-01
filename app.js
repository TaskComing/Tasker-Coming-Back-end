require('dotenv').config();
require('express-async-errors');
require('./controllers/passport');
require('./controllers/passportGoogle');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const keys = require('./utils/keys');
const { connectDB } = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const swaggerJsDoc = require('./utils/swagger');
const v1Router = require('./routes');

const app = express();

// app.use(express.json());
// extra security package
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// routes
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use('/v1', v1Router);

// health check api
app.get('/healthcheck', (request, response) => response.status(200).send({ message: 'healthy' }));

// swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
/**
 * google auth
 */
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: keys.cookieKey,
  })
);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(keys.mongoURI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
