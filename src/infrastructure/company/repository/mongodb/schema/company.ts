import { Document, Schema } from 'mongoose';

interface CompanyPersistence {
  name: string;
  corporateName: string;
  cnpj: string;
  logo?: string;
  address?: {
    zipCode: number;
    houseNumber: number;
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export type CompanyDocument = CompanyPersistence & Document;

export const companySchema = new Schema<CompanyDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
    },
    corporateName: {
      type: String,
      required: true,
    },
    logo: String,
    address: {
      zipCode: {
        type: Number,
        required: true,
      },
      houseNumber: {
        type: Number,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      complement: String,
      neighborhood: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);
