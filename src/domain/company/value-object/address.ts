export class Address {
  private _zipCode: number;
  private _houseNumber: number;
  private _street: string;
  private _complement: string;
  private _neighborhood: string;
  private _city: string;
  private _state: string;

  constructor(
    zipCode: number,
    houseNumber: number,
    street: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string
  ) {
    this._zipCode = zipCode;
    this._houseNumber = houseNumber;
    this._street = street;
    this._complement = complement;
    this._neighborhood = neighborhood;
    this._city = city;
    this._state = state;
  }

  get zipCode(): number {
    return this._zipCode;
  }

  get houseNumber(): number {
    return this._houseNumber;
  }

  get street(): string {
    return this._street;
  }

  get complement(): string {
    return this._complement;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }
}
