import { UniqueIdGenerator } from "@/domain/interface/gateways";
import { UniqueIdGeneratorGateway } from "@/infrastructure/gateways";

describe("UniqueIdGeneratorGateway", () => {
  let uniqueIdGenerator: UniqueIdGenerator;

  beforeEach(() => {
    uniqueIdGenerator = new UniqueIdGeneratorGateway();
  });

  it("Should to check if unique id is valid", () => {
    const uniqueId = uniqueIdGenerator.uuidv4();
    const result = uniqueIdGenerator.isValid(uniqueId);
    expect(result).toBeTruthy();
  });
});
