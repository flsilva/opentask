import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const createProjectSchema = zfd.formData({
  /*
   * Nullable fields for ease of compatibility with prisma results.
   */
  name: zfd.text(
    z
      .string({
        required_error: 'The project name is required.',
        invalid_type_error: 'The project name must be a string.',
      })
      .min(1, { message: 'The project name is required.' })
      .max(500, { message: 'The project name must be 500 characters long or shorter.' }),
  ),
  description: zfd.text(z.string().max(500).optional().nullable()),
  isArchived: zfd.checkbox(),
});

/*
 * We can't use createProjectSchema.extend()
 */
export const updateProjectSchema = zfd.formData({
  /*
   * Nullable fields for ease of compatibility with prisma results.
   */
  name: zfd.text(
    z
      .string({
        required_error: 'The project name is required.',
        invalid_type_error: 'The project name must be a string.',
      })
      .min(1, { message: 'The project name is required.' })
      .max(500, { message: 'The project name must be 500 characters long or shorter.' })
      .optional(),
  ),
  description: zfd.text(z.string().max(500).optional().nullable()),
  isArchived: zfd.checkbox(),
  id: zfd.text(
    z
      .string({
        required_error: 'The project id is required.',
        invalid_type_error: 'The project id must be a string.',
      })
      .cuid2({ message: 'The project id must be a valid cuid2 string.' }),
  ),
});

export const deleteProjectSchema = zfd.formData({
  id: zfd.text(
    z
      .string({
        required_error: 'Cannot update a project without its id.',
        invalid_type_error: 'The project id must be a string.',
      })
      .cuid2({ message: 'The project id must be a valid cuid2 string.' }),
  ),
});
