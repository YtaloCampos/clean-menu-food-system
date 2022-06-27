import { Company } from '@/domain/company/entity';
import { LoadCompany, SaveCompany } from '@/domain/interface/repositories';

export class CompanyRepositoryInMemory implements LoadCompany, SaveCompany {
  constructor(private companies: Company[] = []) {}

  public async load({ id }: LoadCompany.Input): Promise<LoadCompany.OutPut> {
    return this.companies.find((company) => company.id === id);
  }

  public async save(input: SaveCompany.Input): Promise<void> {
    if (input.id) return this.update(input);
    return this.create(input);
  }

  private async create(input: SaveCompany.Input): Promise<void> {
    this.companies.push(input);
  }

  private async update(input: SaveCompany.Input): Promise<void> {
    const index = this.companies.findIndex(
      (company) => company.id === input.id,
    );
    this.companies[index] = input;
  }
}
