import {
  ConsultCompany,
  consultCompanyService,
} from '@/domain/company/service';
import { UniqueIdGenerator } from '@/domain/interface/gateways';
import { LoadCompany } from '@/domain/interface/repositories';
import { UniqueIdGeneratorGateway } from '@/infrastructure/gateways';

import { MockProxy, mock } from 'jest-mock-extended';

describe('ConsultCompanyService', () => {
  let consultCompany: ConsultCompany;
  let companyRepository: MockProxy<LoadCompany>;
  let uniqueIdGenerator: UniqueIdGenerator;
  let uniqueId: string;
  const companyData = {
    id: '',
    name: 'any_name',
    corporateName: 'any_corporate_name',
    cnpj: 'any_cnpj',
    logo: 'any_logo',
    address: {
      zipCode: 1,
      houseNumber: 1,
      street: 'any_address_street',
      complement: 'any_address_complement',
      neighborhood: 'any_address_neighborhood',
      city: 'any_city',
      state: 'any_street',
    },
  };

  beforeAll(() => {
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
    uniqueId = uniqueIdGenerator.uuidv4();
    companyData.id = uniqueId;
    companyRepository = mock();
    companyRepository.load.mockResolvedValue(companyData);
  });

  beforeEach(() => {
    consultCompany = consultCompanyService(companyRepository);
  });

  it('Should to call LoadCompanyRepository with correct input', async () => {
    await consultCompany({ id: uniqueId });

    expect(companyRepository.load).toHaveBeenCalledWith({ id: uniqueId });
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
    companyRepository.load.mockRejectedValueOnce(new Error('consult_error'));

    const promise = consultCompany({ id: uniqueId });

    await expect(promise).rejects.toThrow(new Error('consult_error'));
  });
});
