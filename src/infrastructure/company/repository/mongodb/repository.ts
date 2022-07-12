import { Model, Schema, Types } from 'mongoose';
import { MongoConnection } from './connection';

export abstract class MongoRepository {
  constructor(
    private readonly connection: MongoConnection = MongoConnection.getInstance(),
  ) {}

  public getModel<Entity>(name: string, schema: Schema<Entity>): Model<Entity> {
    return this.connection.getModel<Entity>(name, schema);
  }

  public getId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }
}
