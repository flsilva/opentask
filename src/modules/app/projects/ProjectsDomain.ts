import { z } from 'zod';

/*
 * Nullable fields for ease of compatibility with prisma results.
 */

const idSchema = z
  .string({
    required_error: 'The project id is required.',
    invalid_type_error: 'The project id must be a string.',
  })
  .cuid2({ message: 'The project id must be a valid cuid2 string.' });

const nameSchema = z
  .string({
    required_error: 'The project name is required.',
    invalid_type_error: 'The project name must be a string.',
  })
  .min(1, { message: 'The project name is required.' })
  .max(500, { message: 'The project name must be 500 characters long or shorter.' });

export const createProjectSchema = z.object({
  name: nameSchema,
  description: z.string().max(500).optional().nullable(),
  archivedAt: z
    .literal('')
    .transform(() => undefined)
    .or(z.literal('null').transform(() => null))
    .or(z.coerce.date().optional().nullable()),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: idSchema,
  name: nameSchema.optional().transform((e) => (e === '' ? undefined : e)),
});

export const deleteProjectSchema = z.object({
  id: idSchema,
});
