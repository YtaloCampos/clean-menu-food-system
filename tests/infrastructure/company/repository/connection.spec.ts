import { MongoConnection } from '@/infrastructure/company/repository/mongodb/connection';
import { companySchema } from '@/infrastructure/company/repository/mongodb/schema';
import { env } from '@/main/config/env';

import { connect, disconnect, model } from 'mongoose';
import { mocked } from 'ts-jest/utils';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  Schema: jest.fn(),
  model: jest.fn(),
}));

describe('MongoConnection', () => {
  let mongoConnection: MongoConnection;
  let connectSpy: jest.Mock;
  let disconnectSpy: jest.Mock;
  let modelSpy: jest.Mock;

  beforeAll(() => {
    connectSpy = jest.fn();
    disconnectSpy = jest.fn();
    modelSpy = jest.fn().mockReturnValue('any_model');
    mocked(connect).mockImplementation(connectSpy);
    mocked(disconnect).mockImplementation(disconnectSpy);
    mocked(model).mockImplementation(modelSpy);
  });

  beforeEach(() => {
    mongoConnection = MongoConnection.getInstance();
  });

  it('Should have only one instance', () => {
    const mongoConnection2 = MongoConnection.getInstance();

    expect(mongoConnection).toBe(mongoConnection2);
  });

  it('Should create a new connection', async () => {
    await mongoConnection.connect(env.mongoUri);

    expect(connectSpy).toHaveBeenCalledWith(env.mongoUri);
    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it('Should close connection', async () => {
    await mongoConnection.disconnect();

    expect(disconnectSpy).toHaveBeenCalledWith();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it('Should get model', async () => {
    await mongoConnection.connect(env.mongoUri);
    const result = mongoConnection.getModel('Company', companySchema);

    expect(modelSpy).toHaveBeenCalledWith('Company', companySchema);
    expect(modelSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe('any_model');
  });
});
