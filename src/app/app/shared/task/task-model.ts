'use server';
import { PrismaClient } from '@prisma/client';
import { cuid2 } from '../utils/model-utils';
import { getSessionOrThrow } from '../utils/session-utils';
import { CreateTaskData, CreateTaskSchema, UpdateTaskData, UpdateTaskSchema } from './TaskData';

export const createTask = async (data: CreateTaskData) => {
  console.log('createTask() - data: ', data);

  CreateTaskSchema.parse(data);

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const { projectId, ...rest } = data;
  const prisma = new PrismaClient();

  console.log('createTask() - userId: ', userId);

  const task = await prisma.task.create({
    data: {
      author: { connect: { id: userId } },
      project: { connect: { id: projectId } },
      ...rest,
      id: cuid2(),
    },
  });

  console.log('createTask() - task: ', task);

  return task;
};

export const deleteTask = async (id: string) => {
  console.log('updateTask() - id: ', id);
  if (typeof id !== 'string' || id === '') throw new Error('Invalid task ID.');

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('updateTask() - userId: ', userId);

  const task = await prisma.task.delete({
    where: { id, authorId: userId },
  });

  console.log('updateTask() - task: ', task);

  return task;
};

export const findTasksDueUntilToday = async (isCompleted = false) => {
  console.log('findTasks() - isCompleted: ', isCompleted);
  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  return prisma.task.findMany({
    where: { authorId: userId, dueDate: { lte: new Date() }, isCompleted },
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
  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();
  return prisma.task.findUnique({
    where: { authorId: userId, id },
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

export const updateTask = async (data: UpdateTaskData) => {
  console.log('updateTask() - data: ', data);

  UpdateTaskSchema.parse(data);

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();
  const { id: taskId, ...rest } = data;

  console.log('updateTask() - userId: ', userId);

  return await prisma.task.update({
    where: { id: taskId, authorId: userId },
    data: rest,
  });
};

export const updateTaskDueDate = async (id: string, dueDate: Date | null) => {
  console.log('updateTaskDueDate() - dueDate: ', dueDate);

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('updateTask() - userId: ', userId);

  return await prisma.task.update({
    where: { id, authorId: userId },
    data: { dueDate },
  });
};

export const updateTaskProject = async (id: string, projectId: string) => {
  console.log('updateTaskProject() - projectId: ', projectId);

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('updateTask() - userId: ', userId);

  return await prisma.task.update({
    where: { id, authorId: userId },
    data: { project: { connect: { id: projectId } } },
  });
};

export const updateTaskComplete = async (id: string, isCompleted: boolean) => {
  console.log('updateTaskComplete() - isCompleted: ', isCompleted);

  const session = await getSessionOrThrow();
  const userId = session.user.id;
  const prisma = new PrismaClient();

  return await prisma.task.update({
    where: { id, authorId: userId },
    data: { isCompleted },
  });
};
