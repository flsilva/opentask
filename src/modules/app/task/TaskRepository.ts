'use server';

import { cuid2, prisma } from '@/modules/app/shared/utils/model-utils';
import { getSessionOrThrow } from '@/modules/app/shared/utils/session-utils';
import { CreateTaskDto, createTaskSchema, UpdateTaskDto, updateTaskSchema } from './TaskDomain';

export const createTask = async (data: CreateTaskDto) => {
  createTaskSchema.parse(data);

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();
  const { projectId, ...rest } = data;

  return await prisma.task.create({
    data: {
      author: { connect: { id: authorId } },
      project: { connect: { id: projectId } },
      ...rest,
      id: cuid2(),
    },
  });
};

export const deleteTask = async (id: string) => {
  if (typeof id !== 'string' || id === '') throw new Error('Invalid task ID.');

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return await prisma.task.delete({
    where: { id, authorId },
  });
};

export const getAllTasksDueUntilToday = async (isCompleted = false) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return prisma.task.findMany({
    where: { authorId, dueDate: { lte: new Date() }, isCompleted },
    orderBy: { createdAt: 'asc' },
    include: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getTaskById = async (id: string) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return prisma.task.findUnique({
    where: { authorId, id },
    include: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const updateTask = async (data: UpdateTaskDto) => {
  updateTaskSchema.parse(data);

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();
  const { id: taskId, ...rest } = data;

  return await prisma.task.update({
    where: { id: taskId, authorId },
    data: rest,
  });
};
