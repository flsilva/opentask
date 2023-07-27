import { PrismaClient, User } from '@prisma/client';

export interface CreateUserData {
  readonly email: string;
  readonly id: string;
  readonly name?: string;
  readonly provider: string;
}

export const createUser = async (data: CreateUserData) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({ where: { id: data.id } });

  if (user) return user;

  const newUser = await prisma.user.create({ data });
  return newUser;
};

export const findUserById = async (id: string) => {
  const prisma = new PrismaClient();
  return await prisma.user.findUnique({ where: { id } });
};
