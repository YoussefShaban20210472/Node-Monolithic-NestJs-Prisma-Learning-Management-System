import { app } from '../setup.js';
import request, { type Response, type Test } from 'supertest';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';

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
  console.log(response.status, response.body);
  return { status: response.status, body: response.body };
}
