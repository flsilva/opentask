'use server';

import { z } from 'zod';
import { cuid2, prisma } from '@/modules/app/shared/utils/model-utils';
import { getSessionOrThrow } from '@/modules/app/shared/utils/session-utils';
import { createProjectSchema, updateProjectSchema } from './ProjectDomain';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export type ProjectDto = UpdateProjectDto;

export const createProject = async (data: CreateProjectDto) => {
  createProjectSchema.parse(data);

  const {
    user: { id },
  } = await getSessionOrThrow();

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
  if (typeof id !== 'string' || id === '') throw new Error('Invalid project ID.');

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return await prisma.project.delete({
    where: { id, authorId },
  });
};

export const getAllProjects = async ({
  isArchived = false,
  includeTasks,
}: { isArchived?: boolean; includeTasks?: boolean } = {}) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return await prisma.project.findMany({
    where: { authorId, isArchived },
    orderBy: { createdAt: 'asc' },
    include: {
      tasks: includeTasks,
    },
  });
};

export const getProjectById = async ({ id }: { id: string }) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return prisma.project.findUnique({
    where: { authorId, id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } },
  });
};

export const updateProject = async (data: UpdateProjectDto) => {
  updateProjectSchema.parse(data);

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();
  const { id: projectId, ...rest } = data;

  return await prisma.project.update({
    where: { id: projectId, authorId },
    data: rest,
  });
};
