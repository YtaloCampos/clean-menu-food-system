import {
  GetCompany,
  getCompanyService,
  mockGetCompanyServiceResult,
} from "@/domain/company/service";
import { UniqueIdGenerator } from "@/domain/interface/gateways";
import { UniqueIdGeneratorGateway } from "@/infrastructure/gateways";

describe("GetCompany", () => {
  let getCompany: GetCompany;
  let uniqueIdGenerator: UniqueIdGenerator;

  beforeEach(() => {
    getCompany = getCompanyService();
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
  });

  it("should to call this service", () => {
    const uniqueId = uniqueIdGenerator.uuidv4();
    const result = getCompany({ id: uniqueId });
    expect(result).toStrictEqual(mockGetCompanyServiceResult({ id: uniqueId }));
  });
});
