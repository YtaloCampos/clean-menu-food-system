import { Company } from '@/domain/company/entity';
import {
  ConsultCompany,
  consultCompanyService,
} from '@/domain/company/service';
import { UniqueIdGenerator } from '@/domain/gateway/interface';
import { LoadCompany } from '@/domain/company/repository';
import { UniqueIdGeneratorGateway } from '@/infrastructure/gateway';

import { mock, MockProxy } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';

jest.mock('@/domain/company/entity');
jest.mock('@/domain/company/value-object');

describe('ConsultCompanyService', () => {
  let consultCompany: ConsultCompany;
  let companyRepository: MockProxy<LoadCompany>;
  let uniqueIdGenerator: UniqueIdGenerator;
  let uniqueId: string;
  let companyData: Company;

  beforeAll(() => {
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
    uniqueId = uniqueIdGenerator.uuidv4();
    companyData = mocked(Company).mock.instances[0];
    companyRepository = mock();
    companyRepository.load.mockResolvedValue(companyData);
  });

  beforeEach(() => {
    consultCompany = consultCompanyService(companyRepository);
  });

  it('Should to call LoadCompanyRepository with correct input', async () => {
    await consultCompany({ id: uniqueId });

    expect(companyRepository.load).toHaveBeenCalledWith({ id: uniqueId });
    expect(companyRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should to return a Company on success', async () => {
    const consultCompanyOutput = await consultCompany({ id: uniqueId });

    expect(consultCompanyOutput).toBe(companyData);
  });

  it('Should to return undefined when Company does not exist', async () => {
    companyRepository.load.mockResolvedValueOnce(undefined);

    const consultCompanyOutput = await consultCompany({ id: uniqueId });

    expect(consultCompanyOutput).toBe(undefined);
  });

  it('Should to rethrow LoadCompanyRepository when throws', async () => {
    companyRepository.load.mockRejectedValueOnce(
      new Error('Load company error'),
    );

    const promise = consultCompany({ id: uniqueId });

    await expect(promise).rejects.toThrow(new Error('Load company error'));
  });
});
