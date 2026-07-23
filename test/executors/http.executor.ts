import request, { type Response, type Test } from 'supertest';
import { app } from 'test/setup.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';

export async function executeHttpRequest(
  { method, getUrl, getBody }: HttpRequestOptionsType,
  getToken?: () => string,
) {
  let req: Test = request(app.getHttpServer())
    [method.toLowerCase() as 'get'](getUrl())
    .send(getBody());
  if (getToken) {
    req = req.set('Authorization', getToken());
  }
  const response = await req;
  return { status: response.status, body: response.body };
}
