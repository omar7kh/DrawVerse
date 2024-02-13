import mongoose from 'mongoose';
import 'dotenv/config';

async function connectMongoose() {
  const URI = `${process.env.MDB_URL}`;

  try {
    await mongoose.connect(URI);

    const collections = (
      await mongoose.connection.db.listCollections().toArray()
    ).map((el) => el.name);
    return true;
  } catch (error) {
    console.error('Could not connect to mongoose', error);
    return false;
  }
}

export default connectMongoose;
