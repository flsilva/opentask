import { init } from '@paralleldrive/cuid2';
import { PrismaClient } from '@prisma/client';

export const cuid2 = init({ length: 8 });

/*
 * Fix error on localhost only:
 * "Error querying the database: db error: FATAL: remaining connection slots are reserved for non-replication superuser connections"
 *
 * Fix according to Prisma's official solution:
 * https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
/**/
