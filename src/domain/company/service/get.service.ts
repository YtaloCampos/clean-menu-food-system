import { Company } from "../entity";
import { Address } from "../value-object";

type Setup = () => GetCompany;
type Input = { id: string };
type Output = Company;
export type GetCompany = (input: Input) => Output;

type MockInput = Input;
type MockOutput = Output;

export const getCompanyService: Setup = () => (input) =>
  mockGetCompanyServiceResult(input);

export const mockGetCompanyServiceResult = (input: MockInput): MockOutput => {
  const addressData = {
    city: "any_city",
    complement: "any_complement",
    houseNumber: 1,
    neighborhood: "any_neighborhood",
    state: "any_state",
    street: "any_street",
    zipCode: 1,
  };
  const address = new Address(addressData);
  const companyData = {
    id: input.id,
    address: address,
    cnpj: "any_cnpj",
    corporateName: "any_corporate_name",
    logo: "any_logo",
    name: "any_name",
  };
  const company = new Company(companyData);
  return company;
};
