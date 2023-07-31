'use server';
import { PrismaClient } from '@prisma/client';
import { cuid2 } from '../utils/model-utils';
import { getSession } from '../utils/session-utils';
import {
  CreateProjectData,
  CreateProjectSchema,
  UpdateProjectData,
  UpdateProjectSchema,
} from './ProjectData';

export const createProject = async (data: CreateProjectData) => {
  console.log('createProject() - data: ', data);

  CreateProjectSchema.parse(data);

  const session = await getSession();
  if (session === null || session === undefined)
    throw new Error('Your session has expired. Please sign in again.');

  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('createProject() - userId: ', userId);

  const project = await prisma.project.create({
    data: {
      author: {
        connect: {
          id: userId,
        },
      },
      ...data,
      id: cuid2(),
    },
  });

  console.log('createProject() - project: ', project);

  return project;
};

export const updateProject = async (data: UpdateProjectData) => {
  console.log('updateProject() - data: ', data);

  UpdateProjectSchema.parse(data);

  const session = await getSession();
  if (session === null || session === undefined)
    throw new Error('Your session has expired. Please sign in again.');

  const userId = session.user.id;
  const prisma = new PrismaClient();

  console.log('updateProject() - userId: ', userId);

  const project = await prisma.project.update({
    where: { id: data.id, authorId: userId },
    data: {
      description: data.description,
      name: data.name,
    },
  });

  console.log('updateProject() - project: ', project);

  return project;
};

export const findManyProjects = (isArchived = false) => {
  console.log('findManyProjects()');
  return getSession().then((session) => {
    if (session === null || session === undefined)
      throw new Error('Your session has expired. Please sign in again.');

    const userId = session.user.id;

    const prisma = new PrismaClient();
    return prisma.project.findMany({ where: { authorId: userId, isArchived } });
  });
};

export const findProjectById = (id: string) => {
  const prisma = new PrismaClient();
  return prisma.project.findUnique({ where: { id } });
  // const project = await prisma.project.findUnique({ where: { id } });
  // project.
};

/*
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';
import { cuid2 } from '../model/model-utils';

export const createProject = async (name: string, description?: string) => {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('User session expired.');
  const userId = session.user.id;

  const prisma = new PrismaClient();
  const newProject = await prisma.project.create({
    data: {
      author: {
        connect: {
          id: userId,
        },
      },
      description,
      id: cuid2(),
      name,
    },
  });
  return newProject;
};
*/
