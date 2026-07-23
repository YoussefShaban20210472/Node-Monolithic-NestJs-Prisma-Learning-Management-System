import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';

export let app: INestApplication;

export async function setup() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  await app.init();

  return app;
}

export function getApp() {
  if (!app) {
    throw new Error('Test application has not been initialized.');
  }

  return app;
}

await setup();
