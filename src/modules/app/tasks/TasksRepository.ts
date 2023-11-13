'use server';

import { z } from 'zod';
import { startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { prisma } from '@/modules/shared/data-access/prisma';
import { getServerSideUser } from '@/modules/app/users/UsersRepository';
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
    const { dueDate, projectId, ...data } = validation.data;
    const { id: authorId } = await getServerSideUser();

    const result = await prisma.task.create({
      data: {
        author: { connect: { id: authorId } },
        project: { connect: { id: projectId } },
        ...data,
        ...(dueDate && { dueDate: dueDate.toISOString() }),
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
    const { id: authorId } = await getServerSideUser();

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

export const getTasksDueBy = async ({
  dueBy,
  isCompleted = undefined,
}: {
  readonly dueBy: Date;
  isCompleted?: boolean;
}) => {
  const now = new Date();
  try {
    const { id: authorId, timeZone } = await getServerSideUser();

    const result = await prisma.task.findMany({
      where: {
        authorId,
        dueDate: { lte: zonedTimeToUtc(dueBy, timeZone) },
        isCompleted,
        project: { isNot: { isArchived: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const getTasksDueOn = async ({
  dueOn,
  isCompleted = undefined,
}: {
  readonly dueOn: Date;
  isCompleted?: boolean;
}) => {
  try {
    const { id: authorId, timeZone } = await getServerSideUser();
    const start = zonedTimeToUtc(startOfDay(dueOn), timeZone);
    const current = zonedTimeToUtc(dueOn, timeZone);

    const result = await prisma.task.findMany({
      where: {
        authorId,
        dueDate: {
          gte: start,
          lte: current,
        },
        isCompleted,
        project: { isNot: { isArchived: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const getTasksByProject = async ({
  isCompleted = undefined,
  projectId,
}: {
  readonly isCompleted?: boolean;
  readonly projectId: string;
}) => {
  try {
    const { id: authorId, timeZone } = await getServerSideUser();

    const result = await prisma.task.findMany({
      where: {
        authorId,
        isCompleted,
        projectId,
      },
      orderBy: { createdAt: 'asc' },
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
    const { id: authorId } = await getServerSideUser();

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
    const { id, dueDate, ...data } = validation.data;
    const { id: authorId } = await getServerSideUser();

    const result = await prisma.task.update({
      where: { id, authorId },
      data: {
        ...data,
        ...(dueDate && { dueDate: dueDate.toISOString() }),
      },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};
