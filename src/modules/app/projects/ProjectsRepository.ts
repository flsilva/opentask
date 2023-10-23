'use server';

import { z } from 'zod';
import { cuid2 } from '@/modules/app/shared/data-access/cuid2';
import { prisma } from '@/modules/app/shared/data-access/prisma';
import { getUserId } from '@/modules/app/users/UsersRepository';
import { createProjectSchema, deleteProjectSchema, updateProjectSchema } from './ProjectsDomain';
import { genericAwareOfInternalErrorMessage } from '@/modules/app//shared/errors/errorMessages';
import {
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/modules/app//shared/errors/ServerResponse';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export type ProjectDto = CreateProjectDto & { id: string };

export const createProject = async (prevState: any, formData: FormData) => {
  let data;
  try {
    data = createProjectSchema.parse(formData);
  } catch (error) {
    // LOG ERROR HERE

    // We want to return our custom Zod validation errors.
    return createServerErrorResponse(error);
  }

  try {
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
    // LOG ERROR HERE

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const deleteProject = async (prevState: any, formData: FormData) => {
  let id;
  try {
    ({ id } = deleteProjectSchema.parse(formData));
  } catch (error) {
    // LOG ERROR HERE

    // We want to return our custom Zod validation errors.
    return createServerErrorResponse(error);
  }

  try {
    const authorId = await getUserId();

    const result = await prisma.project.delete({
      where: { id, authorId },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    // LOG ERROR HERE

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
    // LOG ERROR HERE

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
    // LOG ERROR HERE

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

export const updateProject = async (prevState: any, formData: FormData) => {
  /*
   * Flavio Silva on Oct 23rd, 2023:
   * It seems it's not possible to pass a false value to zfd.checkbox() to reset it.
   * I also tried using trueValue: "true" then passing "false" but didn't work either.
   */
  const isArchived = formData.get('isArchived');
  if (isArchived === 'off') formData.delete('isArchived');
  /**/

  let data;
  try {
    data = updateProjectSchema.parse(formData);
  } catch (error) {
    // LOG ERROR HERE

    // We want to return our custom Zod validation errors.
    return createServerErrorResponse(error);
  }

  try {
    const authorId = await getUserId();
    const { id, ...rest } = data;
    if (isArchived === 'off') rest.isArchived = false;

    const result = await prisma.project.update({
      where: { id, authorId },
      data: rest,
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    // LOG ERROR HERE

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};
