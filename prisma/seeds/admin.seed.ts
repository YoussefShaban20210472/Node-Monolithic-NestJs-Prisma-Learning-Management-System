import config from '../../src/config/index.js';
import { PrismaClient, UserRole } from '../../generated/prisma/client.js';
const admin = config.admin;
const prisma = new PrismaClient();
export async function seedAdmin() {
  await prisma.user.upsert({
    where: { email: admin.email },
    update: {},
    create: {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      address: admin.address,
      password: admin.password,
      role: UserRole.ADMIN,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    },
  });
}
