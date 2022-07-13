import { LoadCompany, SaveCompany } from '@/domain/company/repository';
import { MongoRepository } from './repository';
import { companySchema } from './schema';

export class CompanyRepository
  extends MongoRepository
  implements SaveCompany, LoadCompany {
  private readonly companyModel = this.getModel('Company', companySchema);

  public async load({ id }: LoadCompany.Input): Promise<LoadCompany.OutPut> {
    return await this.companyModel.findOne({
      _id: this.getId(id),
    });
  }

  public async save({
    address,
    cnpj,
    corporateName,
    id,
    logo,
    name,
  }: SaveCompany.Input): Promise<SaveCompany.OutPut> {
    const result = await this.companyModel.findOneAndUpdate(
      { _id: this.getId(id) },
      {
        $set: {
          address,
          cnpj,
          corporateName,
          logo,
          name,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );
    return {
      id: result.id,
    };
  }
}
