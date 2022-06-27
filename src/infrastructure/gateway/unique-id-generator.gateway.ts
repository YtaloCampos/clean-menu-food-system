import { UniqueIdGenerator } from '@/domain/interface/gateway';
import { v4 as uuidv4, validate } from 'uuid';

export class UniqueIdGeneratorGateway implements UniqueIdGenerator {
  public uuidv4(): string {
    return uuidv4();
  }

  public isValid(uniqueId: string): boolean {
    return validate(uniqueId);
  }
}
