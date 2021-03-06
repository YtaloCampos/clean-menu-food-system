import { Company } from '@/domain/company/entity';
import { Address } from '@/domain/company/value-object';

describe('Company', () => {
  const addressData = {
    zipCode: 1,
    houseNumber: 1,
    street: 'any_street',
    complement: 'any_complement',
    neighborhood: 'any_neighborhood',
    city: 'any_city',
    state: 'any_state',
  };
  let address: Address;

  beforeAll(() => {
    address = new Address(addressData);
  });

  it('Should to throw if ID is invalid', () => {
    const companyData = {
      id: '',
      name: 'any_name',
      corporateName: 'any_corporate_name',
      cnpj: 'any_cnpj',
      logo: 'any_logo',
      address: address,
    };
    expect(() => new Company(companyData).validate()).toThrowError(
      'ID is required',
    );
  });

  it('Should to throw if Name is invalid', () => {
    const companyData = {
      id: 'any_id',
      name: '',
      corporateName: 'any_corporate_name',
      cnpj: 'any_cnpj',
      logo: 'any_logo',
      address: address,
    };
    expect(() => new Company(companyData).validate()).toThrowError(
      'Name is required',
    );
  });

  it('Should to throw if Corporate name is invalid', () => {
    const companyData = {
      id: 'any_id',
      name: 'any_name',
      corporateName: '',
      cnpj: 'any_cnpj',
      logo: 'any_logo',
      address: address,
    };
    expect(() => new Company(companyData).validate()).toThrowError(
      'Corporate name is required',
    );
  });

  it('Should to throw if Cnpj is invalid', () => {
    const companyData = {
      id: 'any_id',
      name: 'any_name',
      corporateName: 'any_corporate_name',
      cnpj: '',
      logo: 'any_logo',
      address: address,
    };
    expect(() => new Company(companyData).validate()).toThrowError(
      'Cnpj is required',
    );
  });

  it('Should to check if toObject is valid', () => {
    const companyData = {
      id: 'any_id',
      name: 'any_name',
      corporateName: 'any_corporate_name',
      cnpj: 'any_cnpj',
      logo: 'any_logo',
      address: new Address(addressData),
    };
    expect(new Company(companyData).toObject()).toMatchObject({
      name: companyData.name,
      corporateName: companyData.corporateName,
      cnpj: companyData.cnpj,
      logo: companyData.logo,
      address: {
        zipCode: 1,
        houseNumber: 1,
        street: 'any_street',
        complement: 'any_complement',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
      },
    });
  });
});
