import { Company } from '../entity';

export interface LoadCompany {
  load: (input: LoadCompany.Input) => Promise<LoadCompany.OutPut>;
}

export namespace LoadCompany {
  export type Input = {
    id: string;
  };
  export type OutPut =
    | {
        id: string;
        name: string;
        corporateName: string;
        cnpj: string;
        logo?: string;
        address?: {
          zipCode: number;
          houseNumber: number;
          street: string;
          complement?: string;
          neighborhood: string;
          city: string;
          state: string;
        };
      }
    | null
    | undefined;
}

export interface SaveCompany {
  save: (input: SaveCompany.Input) => Promise<void>;
}

export namespace SaveCompany {
  export type Input = Company;
}
