type AddressData = {
  zipCode: number;
  houseNumber: number;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export class Address {
  private _zipCode: number;
  private _houseNumber: number;
  private _street: string;
  private _complement?: string;
  private _neighborhood: string;
  private _city: string;
  private _state: string;

  constructor(addressData: AddressData) {
    this._zipCode = addressData.zipCode;
    this._houseNumber = addressData.houseNumber;
    this._street = addressData.street;
    this._complement = addressData.complement;
    this._neighborhood = addressData.neighborhood;
    this._city = addressData.city;
    this._state = addressData.state;
    this.validate();
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

  get complement(): string | undefined {
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

  private validate(): void {
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
