'use server';

import { z } from 'zod';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { prisma } from '@/modules/shared/data-access/prisma';
import { getUserId } from '@/modules/app/users/UsersRepository';
import { createProjectSchema, deleteProjectSchema, updateProjectSchema } from './ProjectsDomain';
import { genericAwareOfInternalErrorMessage } from '@/modules/app//shared/errors/errorMessages';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/modules/app//shared/errors/ServerResponse';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export type ProjectDto = CreateProjectDto & { id: string };

export const createProject = async (
  prevResponse: ServerResponse<ProjectDto | undefined> | undefined,
  formData: FormData,
) => {
  const validation = createProjectSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse(validation.error);
  }

  try {
    const { data } = validation;
    const id = await getUserId();

    const result = await prisma.project.create({
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

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const deleteProject = async (
  prevResponse: ServerResponse<ProjectDto | undefined> | undefined,
  formData: FormData,
) => {
  const validation = deleteProjectSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse(validation.error);
  }

  try {
    const { id } = validation.data;
    const authorId = await getUserId();

    const result = await prisma.project.delete({
      where: { id, authorId },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const getAllProjects = async ({ isArchived = false }: { isArchived?: boolean } = {}) => {
  try {
    const authorId = await getUserId();

    const result = await prisma.project.findMany({
      where: { authorId, isArchived },
      orderBy: { createdAt: 'asc' },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const getProjectById = async ({ id }: { id: string }) => {
  try {
    const authorId = await getUserId();

    const result = await prisma.project.findUnique({
      where: { authorId, id },
      include: { tasks: { orderBy: { createdAt: 'asc' } } },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const updateProject = async (
  prevResponse: ServerResponse<ProjectDto | undefined> | undefined,
  formData: FormData,
) => {
  const validation = updateProjectSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse(validation.error);
  }

  try {
    const { id, ...data } = validation.data;
    const authorId = await getUserId();

    const result = await prisma.project.update({
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
