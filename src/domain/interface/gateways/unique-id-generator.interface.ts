export interface UniqueIdGenerator {
  uuidv4: () => string;
  isValid: (uniqueId: string) => boolean;
}
