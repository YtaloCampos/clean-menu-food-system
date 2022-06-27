import {
  ConsultCompany,
  UpdateCompany,
  updateCompanyService,
} from '@/domain/company/service';
import { UniqueIdGenerator } from '@/domain/interface/gateways';
import { SaveCompany } from '@/domain/company/repositories';
import { UniqueIdGeneratorGateway } from '@/infrastructure/gateways';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UpdateCompanyService', () => {
  let updateCompany: UpdateCompany;
  let consultCompany: MockProxy<ConsultCompany>;
  let companyRepository: MockProxy<SaveCompany>;
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
    companyRepository.save.mockResolvedValue(undefined);
    consultCompany = jest.fn().mockResolvedValue(companyData);
  });

  beforeEach(() => {
    updateCompany = updateCompanyService(companyRepository, consultCompany);
  });

  it('Should to call consultCompany with correct input', async () => {
    await updateCompany(companyData);
    expect(consultCompany).toHaveBeenCalledWith({ id: uniqueId });
  });

  it('Should to call SaveCompanyRepository with correct input', async () => {
    await updateCompany(companyData);
    expect(companyRepository.save).toHaveBeenCalledWith(companyData);
  });

  it('Should to rethrow when consultCompany throws', async () => {
    consultCompany = jest
      .fn()
      .mockRejectedValueOnce(() => new Error('Consult company error'));
    updateCompany = updateCompanyService(companyRepository, consultCompany);

    const promise = updateCompany(companyData);

    await expect(promise).rejects.toThrow(new Error('Consult company error'));
  });

  it('Should to rethrow when throws a Company not found', async () => {
    consultCompany = jest.fn().mockResolvedValueOnce(undefined);
    updateCompany = updateCompanyService(companyRepository, consultCompany);

    const promise = updateCompany(companyData);

    await expect(promise).rejects.toThrow(new Error('Company not found'));
  });

  it('Should to rethrow when SaveCompanyRepository throws', async () => {
    consultCompany = jest.fn().mockResolvedValueOnce(companyData);
    companyRepository.save.mockRejectedValueOnce(
      new Error('Update company error'),
    );
    updateCompany = updateCompanyService(companyRepository, consultCompany);

    const promise = updateCompany(companyData);

    await expect(promise).rejects.toThrow(new Error('Update company error'));
  });
});
