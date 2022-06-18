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

  beforeAll(() => {
    companyRepository = mock();
  });

  beforeEach(() => {
    consultCompany = consultCompanyService(companyRepository);
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
  });

  it('Should to call LoadCompanyRepository with correct input', async () => {
    const uniqueId = uniqueIdGenerator.uuidv4();
    await consultCompany({ id: uniqueId });

    expect(companyRepository.load).toHaveBeenCalledWith({ id: uniqueId });
  });
});
