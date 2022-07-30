import { ConsultCompanyController } from '@/application/company/controller';
import { badRequest, notFound, ok, serverError } from '@/application/helper';
import { Company } from '@/domain/company/entity';
import { Address } from '@/domain/company/value-object';

describe('ConsultCompanyController', () => {
  let consultCompanyController: ConsultCompanyController;
  let consultCompany: jest.Mock;
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
    consultCompany = jest.fn();
    consultCompany.mockResolvedValue(companyData);
  });

  beforeEach(() => {
    consultCompanyController = new ConsultCompanyController(consultCompany);
  });

  it('Should return 400 if companyId is empty', async () => {
    const httpResponse = await consultCompanyController.handle({
      id: '',
    });

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field companyId is required'),
    });
  });

  it('Should return 400 if id is null', async () => {
    const httpResponse = await consultCompanyController.handle({ id: null });

    expect(httpResponse).toEqual(
      badRequest(new Error('The field companyId is required')),
    );
  });

  it('Should return 400 if id is undefined', async () => {
    const httpResponse = await consultCompanyController.handle({
      id: undefined,
    });

    expect(httpResponse).toEqual(
      badRequest(new Error('The field companyId is required')),
    );
  });

  it('Shoud call consult company with correct params', async () => {
    await consultCompanyController.handle({
      id: 'any_id',
    });

    expect(consultCompany).toHaveBeenCalledWith({
      id: 'any_id',
    });
  });

  it('Should return 404 if company not found', async () => {
    consultCompany.mockResolvedValueOnce(null);
    const httpResponse = await consultCompanyController.handle({
      id: 'any_id',
    });

    expect(httpResponse).toEqual(notFound(new Error('Company not found')));
  });

  it('Should return 200 if consult company succeds', async () => {
    const httpResponse = await consultCompanyController.handle({
      id: 'any_id',
    });

    expect(httpResponse).toEqual(ok(companyData));
  });

  it('Should return 500 if consult company throws', async () => {
    consultCompany.mockRejectedValueOnce(new Error('Consult company fails'));
    const httpResponse = await consultCompanyController.handle({
      id: 'any_id',
    });

    expect(httpResponse).toEqual(
      serverError(new Error('Consult company fails')),
    );
  });
});
