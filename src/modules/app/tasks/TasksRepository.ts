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

    /*
     * Flavio Silva on Nov. 18th, 2023:
     *
     * The revalidateTag('tasks') below works when this Server Action is triggered from
     * the <TaskForm> component that is rendered as part of the "/app/projects/[projectId]"
     * and "/app/today" regular routes. The cache is purged (even though this is the only place
     * I'm using the 'tasks' tag), and Server and Client components re-render and re-fetch data,
     * updating the UI accordingly.
     *
     * But there's a bug when it's triggered from the <TaskForm> component that is rendered
     * as part of the "/app/tasks/new" route, which is an Intercepting Route rendered on
     * small screens (it can be tested by rezising the desktop browser). That route maps to the
     * following filesystem page: "/app/app/@dialog/(.)tasks/new/page.tsx".
     *
     * Curiously, if we are at that route and refresh the browser, we render the non-dialog version
     * of it, mapped to the following filesystem page: "/app/app/tasks/new/page.tsx". And the bug
     * also happens there.
     *
     * The bug is that Client Components never receive the result of this Server Action, i.e.,
     * neither useFormStatus() nor useFormState() are updated, they don't re-render,
     * and so the onFormSubmitted() of <TaskForm> is never called. The app hangs waiting for
     * this Server Action result. If we refresh the browser, the created task is there, so
     * this Server Action works. And I verified that createServerSuccessResponse() function
     * is called as expected with the correct "result" argument.
     *
     * Because of that bug, the revalidateTag('tasks') below is commented out,
     * and I'm using "router.refresh()" in <TaskForm>'s onFormSubmitted() to re-fetch and re-render
     * components as a workaround it.
     *
     * The fact that it works on regular routes but not on Intercepting Routes makes me think
     * that the problem is related to Intercepting Routes.
     */
    // revalidateTag('tasks');
    /**/
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
