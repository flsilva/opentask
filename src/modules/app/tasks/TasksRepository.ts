'use server';

import { z } from 'zod';
import { endOfDay, startOfDay } from 'date-fns';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { prisma } from '@/modules/shared/data-access/prisma';
import { getServerSideUser } from '@/modules/app/users/UsersRepository';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from './TasksDomain';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/modules/shared/data-access/ServerResponse';
import { genericAwareOfInternalErrorMessage } from '@/modules/app/shared/errors/errorMessages';
import { TaskStatus } from './TaskStatus';
import { ProjectStatus } from '../projects/ProjectStatus';

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

export interface GetTasksProps {
  readonly byProject?: string;
  readonly dueBy?: Date;
  readonly dueOn?: Date;
  readonly only?: TaskStatus;
  readonly onlyProject?: ProjectStatus;
}

export const getTasks = async ({
  byProject,
  dueBy,
  dueOn,
  only,
  onlyProject,
}: GetTasksProps = {}) => {
  if (dueBy && dueOn) {
    throw new Error('getTasks(): Only dueBy or dueOn arguments can be provided.');
  }

  try {
    const { id: authorId } = await getServerSideUser();

    const result = await prisma.task.findMany({
      where: {
        authorId,
        ...(dueBy && { dueDate: { lte: endOfDay(dueBy) } }),
        ...(dueOn && { dueDate: { gte: startOfDay(dueOn), lte: endOfDay(dueOn) } }),
        ...(only && { isCompleted: only === TaskStatus.Complete }),
        ...(byProject && { projectId: byProject }),
        ...(onlyProject && {
          project: { is: { isArchived: onlyProject === ProjectStatus.Archived } },
        }),
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
