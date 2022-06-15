import { Entity } from "@/domain/@shared";
import { Address } from "../value-object";

export class Company implements Entity {
  private _id: string;
  private _name: string;
  private _corporateName: string;
  private _cnpj: string;
  private _logo: string;
  private _address: Address;

  constructor(
    id: string,
    name: string,
    corporateName: string,
    cnpj: string,
    logo: string,
    address: Address
  ) {
    this._id = id;
    this._name = name;
    this._corporateName = corporateName;
    this._cnpj = cnpj;
    this._logo = logo;
    this._address = address;
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

  get logo(): string {
    return this._logo;
  }

  get address(): Address {
    return this._address;
  }

  public changeAddress(address: Address): void {
    this._address = address;
  }
}
