import mongoose from 'mongoose'
import config from '../config/index'

const connection = async () => {
    return await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true    
    })
    .then(_ => console.log('DB Connected'))
    .catch(_ => console.log('Connection Failed'))
    //   return connection.connection.db;
}

export default connection