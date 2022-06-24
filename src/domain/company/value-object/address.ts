type AddressData = {
  zipCode: number;
  houseNumber: number;
  street: string;
  complement?: string | undefined;
  neighborhood: string;
  city: string;
  state: string;
};

export class Address {
  private _zipCode: number;
  private _houseNumber: number;
  private _street: string;
  private _complement?: string | undefined;
  private _neighborhood: string;
  private _city: string;
  private _state: string;

  constructor(addressData: AddressData) {
    this._zipCode = addressData.zipCode;
    this._houseNumber = addressData.houseNumber;
    this._street = addressData.street;
    this._complement = addressData.complement ?? undefined;
    this._neighborhood = addressData.neighborhood;
    this._city = addressData.city;
    this._state = addressData.state;
  }

  get zipCode(): number {
    return this._zipCode;
  }

  set zipCode(zipCode: number) {
    this._zipCode = zipCode;
  }

  get houseNumber(): number {
    return this._houseNumber;
  }

  set houseNumber(houseNumber: number) {
    this._houseNumber = houseNumber;
  }

  get street(): string {
    return this._street;
  }

  set street(street: string) {
    this._street = street;
  }

  get complement(): string | undefined {
    return this._complement;
  }

  set complement(complement: string | undefined) {
    this._complement = complement;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }

  set neighborhood(neighborhood: string) {
    this._neighborhood = neighborhood;
  }

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get state(): string {
    return this._state;
  }

  set state(state: string) {
    this._state = state;
  }

  public validate(): void {
    if (!this._zipCode) {
      throw new Error('Zip Code is required');
    }
    if (!this._houseNumber) {
      throw new Error('House Number is required');
    }
    if (!this._street) {
      throw new Error('Street is required');
    }
    if (!this._neighborhood) {
      throw new Error('Neighborhood is required');
    }
    if (!this._city) {
      throw new Error('City is required');
    }
    if (!this._state) {
      throw new Error('State is required');
    }
  }
}
