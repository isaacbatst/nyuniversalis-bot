import Mongoose from "mongoose";

let connection: Mongoose.Connection;

const uri = process.env.DB_URI || '';

export function connect() {
  if (connection) {
    return connection;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

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