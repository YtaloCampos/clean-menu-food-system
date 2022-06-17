type Setup = () => GetCompany;
type Input = { id: string };
export type GetCompany = (input: Input) => void;

export const getCompanyService: Setup = () => (input) => {
  // TODO
};
