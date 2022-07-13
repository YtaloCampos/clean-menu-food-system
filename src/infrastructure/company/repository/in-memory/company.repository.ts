import { Company } from '@/domain/company/entity';
import { LoadCompany, SaveCompany } from '@/domain/company/repository';

export class CompanyRepositoryInMemory implements LoadCompany, SaveCompany {
  constructor(private companies: Company[] = []) {}

  public async load({ id }: LoadCompany.Input): Promise<LoadCompany.OutPut> {
    return this.companies.find((company) => company.id === id);
  }

  public async save(input: SaveCompany.Input): Promise<SaveCompany.OutPut> {
    if (input.id) return this.update(input);
    return this.create(input);
  }

  public async update(input: SaveCompany.Input): Promise<SaveCompany.OutPut> {
    const index = this.companies.findIndex(
      (company) => company.id === input.id,
    );
    this.companies[index] = input;
    return {
      id: input.id,
    };
  }

  private async create(input: SaveCompany.Input): Promise<SaveCompany.OutPut> {
    this.companies.push(input);
    return {
      id: input.id,
    };
  }
}
