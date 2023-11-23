'use server';

import 'server-only';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { prisma } from '@/modules/shared/data-access/prisma';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/modules//shared/data-access/ServerResponse';
import { genericAwareOfInternalErrorMessage } from '@/modules/app//shared/errors/errorMessages';
import { getServerSideUser } from '@/modules/app/users/UsersRepository';
import { createProjectSchema, deleteProjectSchema, updateProjectSchema } from './ProjectsDomain';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export type ProjectDto = CreateProjectDto & { id: string };

export const createProject = async (
  prevResponse: ServerResponse<ProjectDto> | undefined,
  formData: FormData,
) => {
  const validation = createProjectSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // return Zod validation errors.
    return createServerErrorResponse<ProjectDto>(validation.error);
  }

  let result;

  try {
    const { data } = validation;
    const { id } = await getServerSideUser();

    result = await prisma.project.create({
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
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the unknown real one.
    return createServerErrorResponse<ProjectDto>(genericAwareOfInternalErrorMessage);
  }

  redirect(`/app/projects/${result.id}`);
};

export const deleteProject = async (
  prevResponse: ServerResponse<ProjectDto> | undefined,
  formData: FormData,
) => {
  const validation = deleteProjectSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // return Zod validation errors.
    return createServerErrorResponse<ProjectDto>(validation.error);
  }

  try {
    const { id } = validation.data;
    const { id: authorId } = await getServerSideUser();

    await prisma.project.delete({
      where: { id, authorId },
    });
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<ProjectDto>(genericAwareOfInternalErrorMessage);
  }

  redirect('/app/today');
};

export const getProjects = async ({ isArchived }: { isArchived?: boolean } = {}) => {
  try {
    const { id: authorId } = await getServerSideUser();

    const result = await prisma.project.findMany({
      where: { authorId, archivedAt: isArchived ? { not: null } : null },
      orderBy: isArchived ? { archivedAt: 'desc' } : { createdAt: 'asc' },
    });
    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<ProjectDto[]>(genericAwareOfInternalErrorMessage);
  }
};

export const getProjectById = async ({ id }: { id: string }) => {
  try {
    const { id: authorId } = await getServerSideUser();

    const result = await prisma.project.findUnique({
      where: { authorId, id },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<ProjectDto>(genericAwareOfInternalErrorMessage);
  }
};

export const updateProject = async (
  prevResponse: ServerResponse<ProjectDto> | undefined,
  formData: FormData,
) => {
  const validation = updateProjectSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // return Zod validation errors.
    return createServerErrorResponse<ProjectDto>(validation.error);
  }

  let result;

  try {
    const { id, ...data } = validation.data;
    const { id: authorId } = await getServerSideUser();

    result = await prisma.project.update({
      where: { id, authorId },
      data,
    });
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<ProjectDto>(genericAwareOfInternalErrorMessage);
  }

  redirect(`/app/projects/${result.id}`);
};
