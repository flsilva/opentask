'use server';
import { PrismaClient } from '@prisma/client';
import { cuid2 } from '../utils/model-utils';
import { getSessionOrThrow } from '../utils/session-utils';
import {
  CreateProjectData,
  CreateProjectSchema,
  UpdateProjectData,
  UpdateProjectSchema,
} from './ProjectData';
import { TaskData } from '../task/TaskData';

export const createProject = async (data: CreateProjectData) => {
  console.log('createProject() - data: ', data);

  CreateProjectSchema.parse(data);

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('createProject() - userId: ', userId);

  const project = await prisma.project.create({
    data: {
      author: {
        connect: {
          id: userId,
        },
      },
      ...data,
      id: cuid2(),
    },
  });

  console.log('createProject() - project: ', project);

  return project;
};

export const deleteProject = async (id: string) => {
  console.log('updateProject() - id: ', id);
  if (typeof id !== 'string' || id === '') throw new Error('Invalid project ID.');

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('updateProject() - userId: ', userId);

  const project = await prisma.project.delete({
    where: { id, authorId: userId },
  });

  console.log('updateProject() - project: ', project);

  return project;
};

export const findManyProjects = async ({
  isArchived,
  includeTasks,
}: { isArchived?: boolean; includeTasks?: boolean } = {}) => {
  console.log('findManyProjects()');
  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  return await prisma.project.findMany({
    where: { authorId: userId, isArchived },
    orderBy: { createdAt: 'asc' },
    include: {
      tasks: includeTasks,
    },
  });
};

export const findProjectById = async ({ id }: { id: string; }) => {
  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();
 
  return prisma.project.findUnique({
    where: { authorId: userId, id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } },
  });
};

export const updateProject = async (data: UpdateProjectData) => {
  console.log('updateProject() - data: ', data);

  UpdateProjectSchema.parse(data);

  const session = await getSessionOrThrow();

  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('updateProject() - userId: ', userId);

  const { id: projectId, ...rest } = data;

  const project = await prisma.project.update({
    where: { id: projectId, authorId: userId },
    data: rest,
  });

  console.log('updateProject() - project: ', project);

  return project;
};
