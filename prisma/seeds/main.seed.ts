import { seedAdmin } from './admin.seed.js';
import { seedUsers } from './users.seed.js';

async function main() {
  await seedAdmin();
  await seedUsers();
}

main();
