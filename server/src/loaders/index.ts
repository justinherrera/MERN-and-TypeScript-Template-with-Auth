import server from './server'
import connection from './mongoose'


import { Application } from 'express'

const connect = (app: Application) => {
  server(app);
  connection();

  // ... more loaders can be here
}

export default connect