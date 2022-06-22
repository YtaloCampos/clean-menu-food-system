import { Address } from '@/domain/company/value-object';

describe('Address', () => {
  it('Should to throw if Zip Code is invalid', () => {
    const addressData = {
      zipCode: 0,
      houseNumber: 1,
      street: 'any_street',
      complement: 'any_complement',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
    };
    expect(() => new Address(addressData).validate()).toThrowError(
      'Zip Code is required',
    );
  });

  it('Should to throw if House Number is invalid', () => {
    const addressData = {
      zipCode: 1,
      houseNumber: 0,
      street: 'any_street',
      complement: 'any_complement',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
    };
    expect(() => new Address(addressData).validate()).toThrowError(
      'House Number is required',
    );
  });

  it('Should to throw if Street is invalid', () => {
    const addressData = {
      zipCode: 1,
      houseNumber: 1,
      street: '',
      complement: 'any_complement',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
    };
    expect(() => new Address(addressData).validate()).toThrowError(
      'Street is required',
    );
  });

  it('Should to throw if Neighborhood is invalid', () => {
    const addressData = {
      zipCode: 1,
      houseNumber: 1,
      street: 'any_street',
      complement: 'any_complement',
      neighborhood: '',
      city: 'any_city',
      state: 'any_state',
    };
    expect(() => new Address(addressData).validate()).toThrowError(
      'Neighborhood is required',
    );
  });

  it('Should to throw if City is invalid', () => {
    const addressData = {
      zipCode: 1,
      houseNumber: 1,
      street: 'any_street',
      complement: 'any_complement',
      neighborhood: 'any_neighborhood',
      city: '',
      state: 'any_state',
    };
    expect(() => new Address(addressData).validate()).toThrowError(
      'City is required',
    );
  });

  it('Should to throw if State is invalid', () => {
    const addressData = {
      zipCode: 1,
      houseNumber: 1,
      street: 'any_street',
      complement: 'any_complement',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: '',
    };
    expect(() => new Address(addressData).validate()).toThrowError(
      'State is required',
    );
  });
});
