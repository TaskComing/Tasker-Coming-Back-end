require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./config/passport')(passport);
const swaggerUi = require('swagger-ui-express');
const { connectDB } = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const swaggerJsDoc = require('./utils/swagger');

const v1Router = require('./routes');

const app = express();

app.use(express.json());
// extra security package
app.use(helmet());
app.use(xss());
app.use(cors());
// routes
app.use('/v1', v1Router);

// health check api
app.get('/healthcheck', (request, response) => response.status(200).send({ message: 'healthy' }));

// swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
/**
 * google auth
 */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: ['J5IAoT04te'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
