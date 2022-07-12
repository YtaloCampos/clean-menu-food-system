import { LoadCompany, SaveCompany } from '@/domain/company/repository';
import { MongoRepository } from './mongodb/repository';
import { companySchema } from './mongodb/schema';

export class CompanyRepository
  extends MongoRepository
  implements SaveCompany, LoadCompany {
  private companyModel = this.getModel('Company', companySchema);

  public async load({ id }: LoadCompany.Input): Promise<LoadCompany.OutPut> {
    return await this.companyModel.findOne({
      id: this.getId(id),
    });
  }

  public async save({
    address,
    cnpj,
    corporateName,
    id,
    logo,
    name,
  }: SaveCompany.Input): Promise<void> {
    await this.companyModel.updateOne(
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
      },
    );
  }
}
