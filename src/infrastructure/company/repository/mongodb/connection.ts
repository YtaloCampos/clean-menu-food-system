import mongoose, { Connection, Model, model, Schema } from 'mongoose';

export class MongoConnection {
  private static instance: MongoConnection;
  private connection?: Connection;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(mongoUrl: string): Promise<void> {
    if (this.connection) {
      throw new Error('There is already a mongodb connection active');
    }
    this.connection = mongoose.createConnection(mongoUrl);
  }

  public async disconnect(): Promise<void> {
    if (!this.connection) {
      throw new Error('There is no longer a mongodb connection active');
    }
    await mongoose.disconnect();
    this.connection = undefined;
  }

  public getModel<Entity>(name: string, schema: Schema<Entity>): Model<Entity> {
    return model<Entity>(name, schema);
  }
}
