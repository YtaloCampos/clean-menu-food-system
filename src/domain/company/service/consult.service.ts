import { LoadCompany } from '@/domain/company/repository';
import { Company } from '../entity';
import { Address } from '../value-object';

type Setup = (loadCompany: LoadCompany) => ConsultCompany;
type Input = { id: string };
type OutPut = Company;
export type ConsultCompany = (input: Input) => Promise<OutPut | undefined>;

export const consultCompanyService: Setup = (loadCompany) => async (input) => {
  const result = await loadCompany.load({ id: input.id }).catch(() => {
    throw new Error('Load company error');
  });
  if (!result) {
    return undefined;
  }
  const company = new Company({
    cnpj: result.cnpj,
    corporateName: result.corporateName,
    id: result.id,
    logo: result.logo,
    name: result.name,
  });
  if (result.address) {
    company.address = new Address({
      city: result.address.city,
      complement: result.address.complement,
      houseNumber: result.address.houseNumber,
      neighborhood: result.address.neighborhood,
      state: result.address.state,
      street: result.address.street,
      zipCode: result.address.zipCode,
    });
  }
  return company;
};
