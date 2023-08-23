'use server';
import { cuid2, prisma } from '../common/utils/model-utils';
import { getSessionOrThrow } from '../common/utils/session-utils';
import {
  CreateProjectDTO,
  CreateProjectDTOSchema,
  UpdateProjectDTO,
  UpdateProjectDTOSchema,
} from './project-model-dto';

export const createProject = async (data: CreateProjectDTO) => {
  CreateProjectDTOSchema.parse(data);

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

export const findManyProjects = async ({
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

export const findProjectById = async ({ id }: { id: string }) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return prisma.project.findUnique({
    where: { authorId, id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } },
  });
};

export const updateProject = async (data: UpdateProjectDTO) => {
  UpdateProjectDTOSchema.parse(data);

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();
  const { id: projectId, ...rest } = data;

  return await prisma.project.update({
    where: { id: projectId, authorId },
    data: rest,
  });
};
