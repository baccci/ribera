import {connect, connection} from 'mongoose';
import {gray, red, green} from 'colorette';

const databaseConnection = {
  isConnected: false,
}

export async function dbConnect(){
  if(databaseConnection.isConnected) return;
  
  console.log(gray('\n[Connecting to database...]\n'));
  const uri = process.env.MONGODB_URI;
  const db =  await connect(uri!);
  databaseConnection.isConnected = db.connections[0].readyState === 1;
}

connection.on("connected", () => {
  console.log(green("Database is connected"));
});

connection.on("error", (err) => {
  console.log(red(`Failed to connect to database: ${err}`));
});