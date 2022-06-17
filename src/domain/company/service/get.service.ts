import { LoadCompany } from '@/domain/interface/repositories';

type Setup = (loadCompany: LoadCompany) => GetCompany;
type Input = { id: string };
type OutPut = LoadCompany.OutPut;
export type GetCompany = (input: Input) => Promise<OutPut>;

export const getCompanyService: Setup = (loadCompany) => async (input) => {
  return await loadCompany.load({ id: input.id }).catch(() => {
    throw new Error('Get company error');
  });
};
