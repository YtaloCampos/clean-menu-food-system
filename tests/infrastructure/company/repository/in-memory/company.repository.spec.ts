import { Company } from '@/domain/company/entity';
import { CompanyRepositoryInMemory } from '@/infrastructure/company/repository/in-memory';

import { Address } from '@/domain/company/value-object';
import { UniqueIdGenerator } from '@/domain/interface/gateway/interface';
import { UniqueIdGeneratorGateway } from '@/infrastructure/gateway';

jest.mock('@/domain/company/entity');
jest.mock('@/domain/company/value-object');

describe('CompanyRepositoryInMemory', () => {
  let companyRepositoryInMemory: CompanyRepositoryInMemory;
  let uniqueIdGenerator: UniqueIdGenerator;
  let uniqueId: string;
  let companyData: Company;

  beforeAll(() => {
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
    uniqueId = uniqueIdGenerator.uuidv4();
    companyData = new Company({
      cnpj: 'any_cnpj',
      corporateName: 'any_corporate_name',
      id: uniqueId,
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
  });

  beforeEach(() => {
    companyRepositoryInMemory = new CompanyRepositoryInMemory();
  });

  describe('load', () => {
    it('Should to return a Company if exists', async () => {
      await companyRepositoryInMemory.save(companyData);

      const company = await companyRepositoryInMemory.load({
        id: companyData.id,
      });

      expect(company).toBe(companyData);
    });

    it('Should to return undefined if a Company does not exists', async () => {
      const company = await companyRepositoryInMemory.load({
        id: companyData.id,
      });

      expect(company).toBe(undefined);
    });
  });

  describe('save', () => {
    it('Should to create a Company if does not exists', async () => {
      await companyRepositoryInMemory.save(companyData);

      const company = await companyRepositoryInMemory.load({
        id: companyData.id,
      });

      expect(company?.id).toBe(companyData.id);
    });

    it('Should to update a Company if id exists', async () => {
      await companyRepositoryInMemory.update(companyData);

      const company = await companyRepositoryInMemory.load({
        id: companyData.id,
      });

      expect(company?.id).toBe(companyData.id);
    });
  });
});
