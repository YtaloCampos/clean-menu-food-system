export interface SaveCompany {
  save: (input: SaveCompany.Input) => void;
}

export namespace SaveCompany {
  export type Input = {
    id?: string;
    name: string;
    corporateName: string;
    cnpj: string;
    logo: string;
    address: {
      zipCode: number;
      houseNumber: number;
      street: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
}
