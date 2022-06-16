import { Company } from "@/domain/company/entity";
import { UpdateCompany, updateCompanyService } from "@/domain/company/service";
import { Address } from "@/domain/company/value-object";
import { UniqueIdGenerator } from "@/domain/interface/gateways";
import { UniqueIdGeneratorGateway } from "@/infrastructure/gateways";

describe("UpdateCompany", () => {
  let updateCompany: UpdateCompany;
  let uniqueIdGenerator: UniqueIdGenerator;
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
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
  });

  it("should to call this service", () => {
    const address = new Address(addressData);
    const companyData = {
      address: address,
      cnpj: "any_cnpj",
      corporateName: "any_corporate_name",
      id: uniqueIdGenerator.uuidv4(),
      logo: "any_logo",
      name: "any_name",
    };
    const company = new Company(companyData);
    const result = updateCompany(company);
    expect(result).toBeUndefined();
  });
});
