import { Company } from '@/domain/company/entity';
import { SaveCompany } from '@/domain/interface/repositories';

type Setup = (companyRepository: SaveCompany) => UpdateCompany;
type Input = Company;
export type UpdateCompany = (input: Input) => void;

export const updateCompanyService: Setup =
  (companyRepository) => async (input) => {
    await companyRepository.save(input).catch(() => {
      throw new Error('Update company error');
    });
  };
