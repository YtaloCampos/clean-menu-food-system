import { SaveCompany } from '@/domain/company/repositories';
import { Address } from '../value-object';
import { ConsultCompany } from './consult.service';

type Setup = (
  companyRepository: SaveCompany,
  consultCompany: ConsultCompany,
) => UpdateCompany;
type Input = {
  id: string;
  name: string;
  corporateName: string;
  cnpj: string;
  logo?: string;
  address?: {
    zipCode: number;
    houseNumber: number;
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};
export type UpdateCompany = (input: Input) => Promise<void>;

export const updateCompanyService: Setup =
  (companyRepository, consultCompany) => async (input) => {
    const company = await consultCompany({ id: input.id }).catch(() => {
      throw new Error('Consult company error');
    });
    if (!company) {
      throw new Error('Company not found');
    }
    company.cnpj = input.cnpj;
    company.corporateName = input.corporateName;
    company.logo = input.logo;
    company.name = input.name;
    company.id = input.id;
    if (input.address) {
      company.address = new Address(input.address);
    }
    await companyRepository.save(company).catch(() => {
      throw new Error('Update company error');
    });
  };
