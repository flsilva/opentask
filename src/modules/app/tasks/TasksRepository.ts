'use server';

import { z } from 'zod';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { prisma } from '@/modules/shared/data-access/prisma';
import { getUserId } from '@/modules/app/users/UsersRepository';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from './TasksDomain';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/modules/app/shared/errors/ServerResponse';
import { genericAwareOfInternalErrorMessage } from '@/modules/app/shared/errors/errorMessages';

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;

export type TaskDto = CreateTaskDto & { id: string };

export const createTask = async (
  prevResponse: ServerResponse<TaskDto | undefined> | undefined,
  formData: FormData,
) => {
  const validation = createTaskSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse(validation.error);
  }

  try {
    const { projectId, ...data } = validation.data;
    const authorId = await getUserId();

    const result = await prisma.task.create({
      data: {
        author: { connect: { id: authorId } },
        project: { connect: { id: projectId } },
        ...data,
        id: cuid2(),
      },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const deleteTask = async (
  prevResponse: ServerResponse<TaskDto | undefined> | undefined,
  formData: FormData,
) => {
  const validation = deleteTaskSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse(validation.error);
  }

  try {
    const { id } = validation.data;
    const authorId = await getUserId();

    const result = await prisma.task.delete({
      where: { id, authorId },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const getAllTasksDueUntilToday = async (isCompleted = false) => {
  try {
    const authorId = await getUserId();

    const result = await prisma.task.findMany({
      where: {
        authorId,
        dueDate: { lte: new Date() },
        isCompleted,
        project: { isNot: { isArchived: true } },
      },
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

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const getTaskById = async (id: string) => {
  try {
    const authorId = await getUserId();

    const result = await prisma.task.findUnique({
      where: { authorId, id },
      include: {
        project: true,
      },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const updateTask = async (
  prevResponse: ServerResponse<TaskDto | undefined> | undefined,
  formData: FormData,
) => {
  const validation = updateTaskSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse(validation.error);
  }

  try {
    const { id, ...data } = validation.data;
    const authorId = await getUserId();

    const result = await prisma.task.update({
      where: { id, authorId },
      data,
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};
