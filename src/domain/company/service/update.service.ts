import { Company } from "@/domain/company/entity";

type Setup = () => UpdateCompany;
type Input = Company;
export type UpdateCompany = (input: Input) => void;

export const updateCompanyService: Setup = () => (input) => {};
