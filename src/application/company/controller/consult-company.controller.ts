import { HttpResponse } from '@/application/@shared';
import { ConsultCompany } from '@/domain/company/service';

export class ConsultCompanyController {
  constructor(private readonly consultCompany: ConsultCompany) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    if (
      httpRequest.id === '' ||
      httpRequest.id === undefined ||
      httpRequest.id === null
    ) {
      return {
        statusCode: 400,
        data: new Error('The field companyId is required'),
      };
    }

    try {
      const result = await this.consultCompany({ id: httpRequest?.id });

      return {
        statusCode: 200,
        data: result,
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: new Error('Consult company fails'),
      };
    }
  }
}
