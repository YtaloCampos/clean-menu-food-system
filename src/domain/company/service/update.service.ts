import { Company } from '@/domain/company/entity';
import { SaveCompany } from '@/domain/interface/repositories';
import { ConsultCompany } from './consult.service';

type Setup = (
  companyRepository: SaveCompany,
  consultCompany: ConsultCompany,
) => UpdateCompany;
type Input = Company;
export type UpdateCompany = (input: Input) => void;

export const updateCompanyService: Setup =
  (companyRepository, consultCompany) => async (input) => {
    const company = await consultCompany({ id: input.id });

    if (!company) {
      throw new Error('Company not found');
    }

    await companyRepository.save(input).catch(() => {
      throw new Error('Update company error');
    });
  };
