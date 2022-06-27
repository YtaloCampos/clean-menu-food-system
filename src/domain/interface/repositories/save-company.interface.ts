import { Company } from '@/domain/company/entity';

export interface SaveCompany {
  save: (input: SaveCompany.Input) => Promise<void>;
}

export namespace SaveCompany {
  export type Input = Company;
}
