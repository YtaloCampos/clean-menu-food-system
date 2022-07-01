import { Company } from '@/domain/company/entity';
import { LoadCompany } from '@/domain/company/repository';
import {
  ConsultCompany,
  consultCompanyService,
} from '@/domain/company/service';
import { Address } from '@/domain/company/value-object';

import { mock, MockProxy } from 'jest-mock-extended';

describe('ConsultCompanyService', () => {
  let consultCompany: ConsultCompany;
  let companyRepository: MockProxy<LoadCompany>;
  const companyData = new Company({
    id: 'any_id',
    name: 'any_name',
    corporateName: 'any_corporate_name',
    cnpj: 'any_cnpj',
    logo: 'any_logo',
    address: new Address({
      zipCode: 1,
      houseNumber: 1,
      street: 'any_address_street',
      complement: 'any_address_complement',
      neighborhood: 'any_address_neighborhood',
      city: 'any_city',
      state: 'any_street',
    }),
  });

  beforeAll(() => {
    companyRepository = mock();
    companyRepository.load.mockResolvedValue(companyData);
  });

  beforeEach(() => {
    consultCompany = consultCompanyService(companyRepository);
  });

  it('Should to call LoadCompanyRepository with correct input', async () => {
    await consultCompany({ id: 'any_id' });

    expect(companyRepository.load).toHaveBeenCalledWith({ id: 'any_id' });
    expect(companyRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should to return a Company on success', async () => {
    const consultCompanyOutput = await consultCompany({ id: 'any_id' });

    expect(consultCompanyOutput).toMatchObject(companyData);
  });

  it('Should to return null when Company does not exist', async () => {
    companyRepository.load.mockResolvedValueOnce(null);

    const consultCompanyOutput = await consultCompany({ id: 'any_id' });

    expect(consultCompanyOutput).toBe(null);
  });

  it('Should to rethrow LoadCompanyRepository when throws', async () => {
    companyRepository.load.mockRejectedValueOnce(
      new Error('Load company error'),
    );

    const promise = consultCompany({ id: 'any_id' });

    await expect(promise).rejects.toThrow(new Error('Load company error'));
  });
});
