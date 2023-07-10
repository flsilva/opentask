'use client';

import { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XIconSvg } from '@/shared/ui/XIconSvg';
import Button from '@/app/(marketing)/ui/Button';
import { TaskData } from '../../../task/TaskData';
import { ProjectData } from '../../../ProjectData';
import { useRouter } from 'next/navigation';
import DropdownMenu, { DropdownMenuItemData } from '@/shared/ui/DropdownMenu';
import TaskDueDatePicker from '../../../task/TaskDueDatePicker';

interface TaskModalModalProps {
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly task: TaskData;
}

export default function TaskModal({ project, projects, task }: TaskModalModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [moveToProject, setMoveToProject] = useState(project);
  const closeButtonRef = useRef(null);
  const router = useRouter();

  console.log('TaskModal() - isEditing: ', isEditing);

  const saveTaskHandler = () => {
    console.log('TaskModal().saveTaskHandler()');
  };

  const onCloseModal = () => {
    console.log('TaskModal().onCloseModal()');
    router.push(`/app/project/${project.id}`);
  };

  const dropdownMenuItemClickHandler = (item: DropdownMenuItemData) => {
    console.log('TaskModal().dropdownMenuItemClickHandler() - item: ', item);
    const project = getProjectById(item.id);
    if (project) setMoveToProject(project);
  };

  const getProjectById = (id: string): ProjectData | undefined =>
    projects.find((project) => project.id === id);

  return (
    <Dialog
      as="div"
      open={true}
      className="relative z-50"
      onClose={onCloseModal}
      initialFocus={closeButtonRef}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center">
        <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
          <form className="flex flex-col">
            <div className="flex items-start justify-between">
              {isEditing && (
                <input
                  name="name"
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={typeof task.name === 'string' ? '' : 'Task name'}
                  required
                  className={`mr-4 block w-full rounded-md text-2xl ${
                    isEditing ? 'border border-gray-400' : 'border-0'
                  } py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0`}
                />
              )}
              {!isEditing && (
                <button
                  type="button"
                  className="mr-4 text-left text-2xl"
                  onClick={() => setIsEditing(true)}
                >
                  {name}
                </button>
              )}
              <button
                type="button"
                className="-mt-1 rounded-md p-2.5 text-gray-700"
                onClick={onCloseModal}
                ref={closeButtonRef}
              >
                <span className="sr-only">Close menu</span>
                <XIconSvg aria-hidden="true" />
              </button>
            </div>
            <textarea
              name="description"
              placeholder={typeof task.description === 'string' ? '' : 'Task description'}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsEditing(true)}
              className={`my-6 block w-full resize-none rounded-md ${
                isEditing ? 'border border-gray-400' : 'border-0'
              } py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0`}
            ></textarea>

            {isEditing && (
              <div className="mb-8 flex justify-end gap-4">
                <Button color="white" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={saveTaskHandler}>Save</Button>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-start">
              <TaskDueDatePicker className="z-50" />
              <div className="relative ml-0 mt-4 h-12 md:ml-16 md:mt-0">
                <DropdownMenu
                  buttonText={moveToProject.name}
                  className="absolute w-56"
                  items={projects.map((project) => ({ id: project.id, label: project.name }))}
                  onDropdownMenuItemClick={dropdownMenuItemClickHandler}
                />
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
