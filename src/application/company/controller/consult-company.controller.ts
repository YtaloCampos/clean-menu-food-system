import {
  badRequest,
  HttpResponse,
  notFound,
  ok,
  serverError,
} from '@/application/helper';
import { Company } from '@/domain/company/entity';
import { ConsultCompany } from '@/domain/company/service';

type HttpRequest = { id: string | null | undefined };
type Model = Error | Company;

export class ConsultCompanyController {
  constructor(private readonly consultCompany: ConsultCompany) {}

  async handle({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!id) return badRequest(new Error('The field companyId is required'));
    try {
      const result = await this.consultCompany({ id });
      if (!result) return notFound(new Error('Company not found'));
      return ok(result);
    } catch (error) {
      return serverError(new Error('Consult company fails'));
    }
  }
}
