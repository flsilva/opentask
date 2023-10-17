'use server';

import { z } from 'zod';
import { cuid2 } from '@/modules/app/shared/data-access/cuid2';
import { prisma } from '@/modules/app/shared/data-access/prisma';
import { getUserId } from '@/modules/app/user/UserRepository';
import { createProjectSchema, updateProjectSchema } from './ProjectDomain';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export type ProjectDto = UpdateProjectDto;

export const createProject = async (data: CreateProjectDto) => {
  createProjectSchema.parse(data);

  const id = await getUserId();

  return await prisma.project.create({
    data: {
      author: {
        connect: {
          id,
        },
      },
      ...data,
      id: cuid2(),
    },
  });
};

export const deleteProject = async (id: string) => {
  if (typeof id !== 'string' || id === '') throw new Error('Invalid argument "id".');

  const authorId = await getUserId();

  return await prisma.project.delete({
    where: { id, authorId },
  });
};

export const getAllProjects = async ({ isArchived = false }: { isArchived?: boolean } = {}) => {
  const authorId = await getUserId();

  return await prisma.project.findMany({
    where: { authorId, isArchived },
    orderBy: { createdAt: 'asc' },
  });
};

export const getProjectById = async ({ id }: { id: string }) => {
  const authorId = await getUserId();

  return prisma.project.findUnique({
    where: { authorId, id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } },
  });
};

export const updateProject = async (data: UpdateProjectDto) => {
  updateProjectSchema.parse(data);

  const authorId = await getUserId();
  const { id: projectId, ...rest } = data;

  return await prisma.project.update({
    where: { id: projectId, authorId },
    data: rest,
  });
};
