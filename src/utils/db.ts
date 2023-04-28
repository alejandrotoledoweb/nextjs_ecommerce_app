import mongoose, { MongooseOptions } from "mongoose";

type connectionType = {
  isConnected: number | boolean;
};

const connection: connectionType = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    console.log("alredy connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("alredy connected");
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(
    process.env.MONGODB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongooseOptions
  );
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function dbDisconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

const db = { dbConnect, dbDisconnect };
export default db;
