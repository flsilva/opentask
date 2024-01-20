'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { endOfDay, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { cuid2 } from '@/features/shared/data-access/cuid2';
import { prisma } from '@/features/shared/data-access/prisma';
import { getServerSideUser } from '@/features/app/users/data-access/UsersDataAccess';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from '../domain/TasksDomain';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/features/shared/data-access/ServerResponse';
import { genericAwareOfInternalErrorMessage } from '@/features/shared/ui/error/errorMessages';

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;

export type TaskDto = CreateTaskDto & { id: string };

/*
 * Flavio Silva on Nov. 20th, 2023:
 *
 * We ca pass anything to revalidateTag(), and even revalidatePath, and it purges the cache
 * and re-renders routes, resulting in the expected UI update.
 *
 * But there's a bug when we use revalidateTag (or revalidatePath) from a Intercepting Route.
 * That can be seen when editing tasks, which happens in the "/app/tasks/[taskId]" route,
 * rendered from either "src/app/app/@dialog/tasks/(.)tasks/[taskId]/page.tsx" or
 * "src/app/app/tasks/[taskId]/page.tsx", and calls the updateTask Server Action of this file.
 *
 * Nothing happens after submitting forms from that Intercepting Route.
 * Server and Client components don't get update, neither useFormStatus() nor useFormState()
 * are updated, they don't re-render with the result of the Server Action, and so
 * we cannot have a callback to update the UI accordingly, since we stay in the same route
 * when updating tasks.
 *
 * The app hangs in a "submitting" state, waiting for this Server Action result. If we refresh
 * the browser, the updated task is indeed updated, so the Server Action works. And I could verify
 * that createServerSuccessResponse() is called as expected with the correct "result" argument.
 *
 * It seems to be a Next.js bug with Intercepting Routes, but I have to try to reproduce it
 * to make sure it's not a bug in my code, and in that case I'll open an issue in Next.js repo.
 */
export const createTask = async (
  prevResponse: ServerResponse<TaskDto> | undefined,
  formData: FormData,
) => {
  const { revalidateTagValue, ...taskData } = Object.fromEntries(formData);
  const validation = createTaskSchema.safeParse(taskData);

  if (!validation.success) {
    console.error(validation.error);

    // We want to return Zod validation errors.
    return createServerErrorResponse<TaskDto>(validation.error);
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
     * Check <TaskFormFields> to see why we need revalidateTagValue.
     *
     * revalidateTag() currently clears the entire client-side router cache
     * regardless of the tag used:
     * https://github.com/vercel/next.js/issues/57914#issuecomment-1803819065
     */
    if (revalidateTagValue) revalidateTag(String(revalidateTagValue));
    /**/
    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<TaskDto>(genericAwareOfInternalErrorMessage);
  }
};

export const deleteTask = async (
  prevResponse: ServerResponse<TaskDto> | undefined,
  formData: FormData,
) => {
  const validation = deleteTaskSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // return Zod validation errors.
    return createServerErrorResponse<TaskDto>(validation.error);
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

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<TaskDto>(genericAwareOfInternalErrorMessage);
  }
};

export interface GetTasksParams {
  readonly byProject?: string;
  readonly dueBy?: Date;
  readonly dueOn?: Date;
  readonly only?: 'completed' | 'incomplete';
  readonly onlyProject?: 'active' | 'archived';
  readonly orderBy?: 'completedAtAsc' | 'completedAtDesc' | 'createdAtAsc' | 'createdAtDesc';
}

export const getTasks = async ({
  byProject,
  dueBy,
  dueOn,
  only,
  onlyProject,
  orderBy,
}: GetTasksParams = {}) => {
  if (dueBy && dueOn) {
    throw new Error('getTasks(): Only dueBy or dueOn arguments can be provided.');
  }

  try {
    const { id: authorId, timeZone } = await getServerSideUser();

    /*
     * Sensible default: order completed tasks by completedAt desc.
     */
    let _orderBy = orderBy;
    if (!_orderBy && only === 'completed') _orderBy = 'completedAtDesc';
    /**/

    let orderByQuery: { completedAt: 'asc' | 'desc' } | { createdAt: 'asc' | 'desc' };
    switch (_orderBy) {
      case 'completedAtAsc':
        orderByQuery = { completedAt: 'asc' };
        break;
      case 'completedAtDesc':
        orderByQuery = { completedAt: 'desc' };
        break;
      case 'createdAtAsc':
        orderByQuery = { createdAt: 'asc' };
        break;
      case 'createdAtDesc':
        orderByQuery = { createdAt: 'desc' };
        break;
      default:
        orderByQuery = { createdAt: 'asc' };
        break;
    }

    const result = await prisma.task.findMany({
      where: {
        authorId,
        ...(dueBy && { dueDate: { lte: zonedTimeToUtc(endOfDay(dueBy), timeZone) } }),
        ...(dueOn && {
          dueDate: {
            gte: zonedTimeToUtc(startOfDay(dueOn), timeZone),
            lte: zonedTimeToUtc(endOfDay(dueOn), timeZone),
          },
        }),
        ...(only && { completedAt: only === 'completed' ? { not: null } : null }),
        ...(byProject && { projectId: byProject }),
        ...(onlyProject && {
          project: { archivedAt: onlyProject === 'archived' ? { not: null } : null },
        }),
      },
      orderBy: orderByQuery,
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<TaskDto[]>(genericAwareOfInternalErrorMessage);
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

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<TaskDto>(genericAwareOfInternalErrorMessage);
  }
};

export const updateTask = async (
  prevResponse: ServerResponse<TaskDto> | undefined,
  formData: FormData,
) => {
  const validation = updateTaskSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    console.error(validation.error);

    // return Zod validation errors.
    return createServerErrorResponse<TaskDto>(validation.error);
  }

  try {
    const { id, dueDate, ...data } = validation.data;
    const { id: authorId } = await getServerSideUser();

    const result = await prisma.task.update({
      where: { id, authorId },
      data: {
        ...data,
        /*
         * We pass dueDate as null when the user clears the datepicker to remove a due date.
         */
        ...(dueDate !== undefined && { dueDate: dueDate ? dueDate.toISOString() : dueDate }),
        /**/
      },
    });

    /*
     * Unfortunately we can't use revalidatePath() and revalidateTag(), they break the app
     * when used from Intercepting Routes.
     *
     * Bug report:
     * https://github.com/vercel/next.js/issues/58772
     */
    // revalidateTag('tasks');
    /**/
    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<TaskDto>(genericAwareOfInternalErrorMessage);
  }
};
