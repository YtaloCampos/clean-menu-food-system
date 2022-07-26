import { Company } from '@/domain/company/entity';
import { Address } from '@/domain/company/value-object';
import { CompanyRepository } from '@/infrastructure/company/repository/mongodb/company.repository';
import { MongoConnection } from '@/infrastructure/company/repository/mongodb/connection';
import { MongoRepository } from '@/infrastructure/company/repository/mongodb/repository';
import {
  CompanyDocument,
  companySchema,
} from '@/infrastructure/company/repository/mongodb/schema';
import { env } from '@/main/config/env';
import { Model } from 'mongoose';

describe('CompanyRepository', () => {
  let companyRepository: CompanyRepository;
  let connection: MongoConnection;
  let companyModel: Model<CompanyDocument>;
  const companyData = new Company({
    id: '',
    cnpj: 'any_cnpj',
    corporateName: 'any_corporate_name',
    name: 'any_name',
    logo: 'any_logo',
    address: new Address({
      city: 'any_address_city',
      houseNumber: 1,
      neighborhood: 'any_address_neighborhood',
      state: 'any_address_state',
      street: 'any_address_street',
      zipCode: 1,
      complement: 'any_address_complement',
    }),
  });

  beforeAll(async () => {
    connection = MongoConnection.getInstance();
    await connection.connect(env.mongoUri);
    companyModel = connection.getModel('Company', companySchema);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  beforeEach(() => {
    companyRepository = new CompanyRepository();
  });

  it('Should extend MongoRepository', async () => {
    expect(companyRepository).toBeInstanceOf(MongoRepository);
  });

  describe('load', () => {
    it('Should return a Company if exists', async () => {
      const { _id } = await companyModel.create(companyData.toObject());

      const company = await companyRepository.load({ id: _id });

      expect(company?.id).toEqual(String(_id));
    });

    it('Should return return undefined if Company does not exists', async () => {
      const { _id } = await companyModel.create(companyData.toObject());

      await companyModel.deleteOne({ _id });

      const company = await companyRepository.load({ id: _id });

      expect(company).toBeNull();
    });
  });

  describe('save', () => {
    it('Should create a Company if id is empty', async () => {
      const createdCompany = await companyRepository.save(companyData);

      const result = await companyModel.findOne({
        _id: connection.getId(createdCompany?.id),
      });

      expect(connection.getId(createdCompany?.id)).toEqual(result?._id);
    });

    it('Should update a Company if id is defined', async () => {
      const { _id } = await companyModel.create(companyData.toObject());

      await companyRepository.save(companyData);

      const result = await companyModel.findOne({ _id: _id });

      expect(result).toMatchObject(companyData.toObject());
    });
  });
});
