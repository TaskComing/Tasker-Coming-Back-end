require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const express = require('express');
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
app.use(cors());
app.use(xss());
// routes
app.use('/v1', v1Router);

// health check api
app.get('/healthcheck', (request, response) => response.status(200).send({ message: 'healthy' }));

// swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
