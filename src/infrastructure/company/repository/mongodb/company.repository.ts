import { LoadCompany, SaveCompany } from '@/domain/company/repository';
import { Model, model, Schema, Types } from 'mongoose';
import { CompanyDocument, companySchema } from './schema';

export class CompanyRepository implements SaveCompany, LoadCompany {
  private model: Model<CompanyDocument>;

  constructor() {
    this.model = this.getModel(companySchema);
  }

  public async load({ id }: LoadCompany.Input): Promise<LoadCompany.OutPut> {
    return await this.model.findOne({ id: new Types.ObjectId(id) });
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
    await this.model.create({ address, cnpj, corporateName, logo, name });
  }

  private async update({
    address,
    cnpj,
    corporateName,
    id,
    logo,
    name,
  }: SaveCompany.Input): Promise<void> {
    await this.model.findOneAndUpdate(
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

  private getModel(schema: Schema<CompanyDocument>): Model<CompanyDocument> {
    return model<CompanyDocument>('Company', schema);
  }
}
