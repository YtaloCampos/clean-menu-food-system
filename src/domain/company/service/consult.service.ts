import { LoadCompany } from '@/domain/interface/repositories';

type Setup = (loadCompany: LoadCompany) => ConsultCompany;
type Input = { id: string };
type OutPut = LoadCompany.OutPut;
export type ConsultCompany = (input: Input) => Promise<OutPut>;

export const consultCompanyService: Setup = (loadCompany) => async (input) =>
  await loadCompany.load({ id: input.id });
