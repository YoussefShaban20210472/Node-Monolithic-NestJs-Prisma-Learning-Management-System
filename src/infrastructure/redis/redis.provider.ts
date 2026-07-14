import { createClient } from 'redis';
import config from '../../config/index.js';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const client = createClient(config.redis);

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await client.connect();

    return client;
  },
};
