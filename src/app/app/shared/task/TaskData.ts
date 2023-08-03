import { z } from 'zod';

export const CreateTaskSchema = z.object({
  /*
   * Nullable fields for ease of compatibility with prisma results.
   */
  createdAt: z.date().optional(),
  description: z.string().max(500).optional().nullable(),
  dueDate: z.date().optional().nullable(),
  isArchived: z.boolean().optional(),
  name: z
    .string({
      required_error: 'The task name is required.',
      invalid_type_error: 'The task name must be a string.',
    })
    .min(1, { message: 'The task name is required.' })
    .max(500, { message: 'The task name must be 500 characters long or shorter.' }),
  projectId: z
    .string({
      required_error: 'Cannot update a task without its projectId.',
      invalid_type_error: 'The task projectId must be a string.',
    })
    .cuid2({ message: 'Invalid task projectId.' }),
});

export type CreateTaskData = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = CreateTaskSchema.extend({
  id: z
    .string({
      required_error: 'Cannot update a task without its id.',
      invalid_type_error: 'The task id must be a string.',
    })
    .cuid2({ message: 'Invalid task ID.' }),
});

export type UpdateTaskData = z.infer<typeof UpdateTaskSchema>;

export type TaskData = UpdateTaskData;
