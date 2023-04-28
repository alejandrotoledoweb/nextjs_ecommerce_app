import mongoose from "mongoose";

type connectionType = {
  isConnected: number | boolean;
};

const connection: connectionType = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    console.log("alredy connected");
    return;
  }
  if (mongoose.connection?.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("alredy connected");
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
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
