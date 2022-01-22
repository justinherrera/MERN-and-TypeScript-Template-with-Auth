// require('module-alias/register')
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  "controllers": `${__dirname}/controllers/`,
  "models": `${__dirname}/models`,
  "utils": `${__dirname}/utils`,
  "middlewares": `${__dirname}/api/middlewares`
});


import loaders from './loaders/index'
import config from './config/index'

import express, { Application } from 'express'

// only export when running tests
const startServer = () => {

  const app: Application = express();

  loaders(app);

  app.listen(config.port, () => {
    console.log(`Server Running at ${config.port}`);
  });

}

startServer()