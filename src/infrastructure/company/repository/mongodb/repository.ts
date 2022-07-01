import { Model, Schema } from 'mongoose';
import { MongoConnection } from './connection';

export abstract class MongoRepository {
  constructor(
    private readonly connection: MongoConnection = MongoConnection.getInstance(),
  ) {}

  getModel<Entity>(name: string, schema: Schema<Entity>): Model<Entity> {
    return this.connection.getModel<Entity>(name, schema);
  }
}
