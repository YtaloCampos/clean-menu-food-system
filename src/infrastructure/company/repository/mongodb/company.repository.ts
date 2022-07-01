import { LoadCompany, SaveCompany } from '@/domain/company/repository';
import { Types } from 'mongoose';
import { MongoRepository } from './repository';
import { companySchema } from './schema';

export class CompanyRepository
  extends MongoRepository
  implements SaveCompany, LoadCompany {
  public async load({ id }: LoadCompany.Input): Promise<LoadCompany.OutPut> {
    const company = this.getModel('Company', companySchema);
    return await company.findOne({
      id: new Types.ObjectId(id),
    });
  }

  public async save(input: SaveCompany.Input): Promise<void> {
    if (!input.id) return this.create(input);
    await this.update(input);
  }

  private async create({
    address,
    cnpj,
    corporateName,
    logo,
    name,
  }: SaveCompany.Input): Promise<void> {
    const company = this.getModel('Company', companySchema);
    await company.create({
      address,
      cnpj,
      corporateName,
      logo,
      name,
    });
  }

  private async update({
    address,
    cnpj,
    corporateName,
    id,
    logo,
    name,
  }: SaveCompany.Input): Promise<void> {
    const company = this.getModel('Company', companySchema);
    await company.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      {
        address,
        cnpj,
        corporateName,
        logo,
        name,
      },
    );
  }
}
