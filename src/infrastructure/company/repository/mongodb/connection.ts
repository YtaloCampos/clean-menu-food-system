import mongoose, { Model, model, Schema } from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

export class MongoConnection {
  private static instance: MongoConnection;
  private connected?: boolean;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(mongoUrl: string): Promise<void> {
    if (this.connected) {
      throw new Error('There is already a mongodb connection active');
    }
    await mongoose.connect(mongoUrl);
    this.connected = true;
  }

  public async disconnect(): Promise<void> {
    if (!this.connected) {
      throw new Error('There is no longer a mongodb connection deactive');
    }
    await mongoose.disconnect();
    this.connected = false;
  }

  public getModel<Entity>(name: string, schema: Schema<Entity>): Model<Entity> {
    return model<Entity>(name, schema);
  }

  public getId(id: string | undefined): ObjectId {
    if (!id) return new mongoose.Types.ObjectId();
    return new mongoose.Types.ObjectId(id);
  }
}
