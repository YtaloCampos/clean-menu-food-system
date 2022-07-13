import mongoose, { Model, Schema } from 'mongoose';
import { MongoConnection } from './connection';

type ObjectId = mongoose.Types.ObjectId;

export abstract class MongoRepository {
  constructor(
    private readonly connection: MongoConnection = MongoConnection.getInstance(),
  ) {}

  public getModel<Entity>(name: string, schema: Schema<Entity>): Model<Entity> {
    return this.connection.getModel<Entity>(name, schema);
  }

  public getId(id: string | undefined): ObjectId {
    return this.connection.getId(id);
  }
}
