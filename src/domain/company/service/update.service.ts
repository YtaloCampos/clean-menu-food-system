import { Company } from '@/domain/company/entity';
import { SaveCompany } from '@/domain/interface/repositories';
import { GetCompany } from './get.service';

type Setup = (
  companyRepository: SaveCompany,
  getCompany: GetCompany,
) => UpdateCompany;
type Input = Company;
export type UpdateCompany = (input: Input) => void;

export const updateCompanyService: Setup =
  (companyRepository, getCompany) => async (input) => {
    const company = await getCompany({ id: input.id });

    if (!company) {
      throw new Error('Company not found');
    }

    await companyRepository.save(input).catch(() => {
      throw new Error('Update company error');
    });
  };
