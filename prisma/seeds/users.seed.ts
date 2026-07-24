import config from '../../src/config/index.js';
import { PrismaClient, UserRole } from '../../generated/prisma/client.js';
const users = [config.instructor, config.student];
const prisma = new PrismaClient();
export async function seedUsers() {
  for (const user of users)
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        password: user.password,
        role:
          user.role === 'INSTRUCTOR' ? UserRole.INSTRUCTOR : UserRole.STUDENT,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
}
