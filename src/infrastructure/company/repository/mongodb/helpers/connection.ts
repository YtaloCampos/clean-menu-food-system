import { env } from '@/main/config/env';
import mongoose from 'mongoose';

export class MongoConnection {
  public async connect(): Promise<void> {
    await mongoose.connect(env.mongoUri);

    mongoose.connection.on('open', () => {
      console.log('MongoDB connected successfully.');
    });

    mongoose.connection.on('error', (error) => {
      console.log(error);
      console.log('Could not connect to MongoDB.');
    });
  }
}
