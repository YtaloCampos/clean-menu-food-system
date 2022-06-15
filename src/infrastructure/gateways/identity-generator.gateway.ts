import { UniqueIdGenerator } from "@/domain/interface/gateways";
import { v4 as uuidv4 } from "uuid";

export class UniqueIdGeneratorGateway implements UniqueIdGenerator {
  public uuidv4(): string {
    return uuidv4();
  }
}
