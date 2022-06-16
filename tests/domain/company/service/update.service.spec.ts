import { Company } from "@/domain/company/entity";
import { UpdateCompany, updateCompanyService } from "@/domain/company/service";
import { Address } from "@/domain/company/value-object";

describe("UpdateCompany", () => {
  let updateCompany: UpdateCompany;
  const addressData = {
    city: "any_city",
    complement: "any_complement",
    houseNumber: 1,
    neighborhood: "any_neighborhood",
    state: "any_state",
    street: "any_street",
    zipCode: 1,
  };

  beforeEach(() => {
    updateCompany = updateCompanyService();
  });

  it("should to call with correct input", () => {
    const address = new Address(addressData);
    const companyData = {
      address: address,
      cnpj: "any_cnpj",
      corporateName: "any_corporate_name",
      id: "any_id",
      logo: "any_logo",
      name: "any_name",
    };
    const company = new Company(companyData);
    const result = updateCompany(company);
    expect(result).toBeUndefined();
  });
});
