'use server';
import { cuid2, prisma } from '../common/utils/model-utils';
import { getSessionOrThrow } from '../common/utils/session-utils';
import {
  CreateTaskDTO,
  CreateTaskDTOSchema,
  UpdateTaskDTO,
  UpdateTaskDTOSchema,
} from './task-model-dto';

export const createTask = async (data: CreateTaskDTO) => {
  CreateTaskDTOSchema.parse(data);

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

export const findTasksDueUntilToday = async (isCompleted = false) => {
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

export const findTaskById = async (id: string) => {
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

export const updateTask = async (data: UpdateTaskDTO) => {
  UpdateTaskDTOSchema.parse(data);

  const {
    user: { id: authorId },
  } = await getSessionOrThrow();
  const { id: taskId, ...rest } = data;

  return await prisma.task.update({
    where: { id: taskId, authorId },
    data: rest,
  });
};

export const updateTaskDueDate = async (id: string, dueDate: Date | undefined) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return await prisma.task.update({
    where: { id, authorId },
    data: { dueDate },
  });
};

export const updateTaskProject = async (id: string, projectId: string) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return await prisma.task.update({
    where: { id, authorId },
    data: { project: { connect: { id: projectId } } },
  });
};

export const updateTaskComplete = async (id: string, isCompleted: boolean) => {
  const {
    user: { id: authorId },
  } = await getSessionOrThrow();

  return await prisma.task.update({
    where: { id, authorId },
    data: { isCompleted },
  });
};
