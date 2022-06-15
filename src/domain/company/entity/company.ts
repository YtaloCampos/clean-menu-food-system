import { Entity } from "@/domain/@shared";
import { Address } from "../value-object";

type CompanyData = {
  id: string;
  name: string;
  corporateName: string;
  cnpj: string;
  logo: string;
  address: Address;
};

export class Company implements Entity {
  private _id: string;
  private _name: string;
  private _corporateName: string;
  private _cnpj: string;
  private _logo?: string;
  private _address: Address;

  constructor(companyData: CompanyData) {
    this._id = companyData.id;
    this._name = companyData.name;
    this._corporateName = companyData.corporateName;
    this._cnpj = companyData.cnpj;
    this._logo = companyData.logo;
    this._address = companyData.address;
    this.validate();
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

  get address(): Address {
    return this._address;
  }

  public validate(): void {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._corporateName.length === 0) {
      throw new Error("Corporate name is required");
    }
    if (this._cnpj.length === 0) {
      throw new Error("Cnpj is required");
    }
  }

  public changeAddress(address: Address): void {
    this._address = address;
  }
}
