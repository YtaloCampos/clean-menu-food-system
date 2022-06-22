import { Entity } from '@/domain/@shared';
import { Address } from '@/domain/company/value-object';

type CompanyData = {
  id: string;
  name: string;
  corporateName: string;
  cnpj: string;
  logo?: string | undefined;
  address?: Address | undefined;
};

export class Company implements Entity {
  private _id: string;
  private _name: string;
  private _corporateName: string;
  private _cnpj: string;
  private _logo?: string | undefined;
  private _address?: Address | undefined;

  constructor(companyData: CompanyData) {
    this._id = companyData.id;
    this._name = companyData.name;
    this._corporateName = companyData.corporateName;
    this._cnpj = companyData.cnpj;
    this._logo = companyData.logo ?? undefined;
    this._address = companyData.address ?? undefined;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get corporateName(): string {
    return this._corporateName;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get logo(): string | undefined {
    return this._logo;
  }

  get address(): Address | undefined {
    return this._address ?? undefined;
  }

  set address(address: Address | undefined) {
    this._address = address;
  }

  public validate(): void {
    if (!this._id) {
      throw new Error('ID is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._corporateName) {
      throw new Error('Corporate name is required');
    }
    if (!this._cnpj) {
      throw new Error('Cnpj is required');
    }
  }
}
