import { NotFound, ServerError } from '../error/http';

export type HttpResponse<T> = {
  statusCode: number;
  data: T;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
});

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: new NotFound(error instanceof Error ? error : undefined),
});

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined),
});
