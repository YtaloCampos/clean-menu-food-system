import { HttpResponse } from '@/application/@shared';
import { Company } from '@/domain/company/entity';
import { ConsultCompany } from '@/domain/company/service';

type HttpRequest = { id: string | null | undefined };
type Model = Error | Company;

export class ConsultCompanyController {
  constructor(private readonly consultCompany: ConsultCompany) {}

  async handle({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!id) {
      return {
        statusCode: 400,
        data: new Error('The field companyId is required'),
      };
    }

    try {
      const result = await this.consultCompany({ id });

      if (!result) {
        return {
          statusCode: 404,
          data: new Error('Company not found'),
        };
      }

      if (result instanceof Company) {
        return {
          statusCode: 200,
          data: result,
        };
      }

      return {
        statusCode: 401,
        data: new Error('Consult company fails'),
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: new Error('Consult company fails'),
      };
    }
  }
}
