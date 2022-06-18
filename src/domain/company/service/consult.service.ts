import { LoadCompany } from '@/domain/interface/repositories';

type Setup = (loadCompany: LoadCompany) => ConsultCompany;
type Input = { id: string };
type OutPut = LoadCompany.OutPut;
export type ConsultCompany = (input: Input) => Promise<OutPut>;

export const ConsultCompanyService: Setup = (loadCompany) => async (input) => {
  return await loadCompany.load({ id: input.id }).catch(() => {
    throw new Error('Consult company error');
  });
};
