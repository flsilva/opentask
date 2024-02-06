import { z } from 'zod';

/*
 * Nullable fields for easier compatibility with Prisma results.
 */

const idSchema = z
  .string({
    required_error: 'The task id is required.',
    invalid_type_error: 'The task id must be a string.',
  })
  .cuid2({ message: 'The task id must be a valid cuid2 string.' });

const nameSchema = z
  .string({
    required_error: 'The task name is required.',
    invalid_type_error: 'The task name must be a string.',
  })
  .min(1, { message: 'The task name is required.' })
  .max(500, { message: 'The task name must be 500 characters long or shorter.' });

const projectIdSchema = z
  .string({
    required_error: 'The project id associated with the task is required.',
    invalid_type_error: 'The project id associated with the task must be a string.',
  })
  .cuid2({ message: 'The project id associated with the task must be a valid cuid2 string.' });

const dateOptionalSchema = z
  .literal('')
  .transform(() => undefined)
  .or(z.literal('null').transform(() => null))
  .or(z.coerce.date().optional().nullable());

export const createTaskSchema = z.object({
  completedAt: dateOptionalSchema,
  description: z.string().max(500).optional().nullable(),
  dueDate: dateOptionalSchema,
  name: nameSchema,
  projectId: projectIdSchema,
});

export const updateTaskSchema = createTaskSchema.extend({
  id: idSchema,
  name: nameSchema.optional().transform((e) => (e === '' ? undefined : e)),
  projectId: projectIdSchema.optional(),
});

export const deleteTaskSchema = z.object({
  id: idSchema,
});
