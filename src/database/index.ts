import dotenv from 'dotenv';
dotenv.config();

import Mongoose from "mongoose";

let connection: Mongoose.Connection;

const uri = process.env.DB_URI;


export function connect() {
  if (connection) {
    return connection;
  }
  
  if(!uri) throw new Error('MONGO_URI_NOT_DEFINED');

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  console.log('connecting to: ', uri);

  connection = Mongoose.connection;

  connection.on('error', console.error.bind(console, 'connection error:'));

  connection.once('open', () => {
    console.log('connected')
  });

  return connection;
}

export const disconnect = () => {
  if (!connection) {
    return;
  }

  console.log('disconnected')

  Mongoose.disconnect();
};