import { Company } from '@/domain/company/entity';
import { SaveCompany } from '@/domain/interface/repositories';
import { ConsultCompany } from './consult.service';

type Setup = (
  companyRepository: SaveCompany,
  consultCompany: ConsultCompany,
) => UpdateCompany;
type Input = Company;
export type UpdateCompany = (input: Input) => Promise<void>;

export const updateCompanyService: Setup =
  (companyRepository, consultCompany) => async (input) => {
    const company = await consultCompany({ id: input.id }).catch(() => {
      throw new Error('Consult company error');
    });
    if (!company) {
      throw new Error('Company not found');
    }
    await companyRepository.save(input).catch(() => {
      throw new Error('Update company error');
    });
  };
