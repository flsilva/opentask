'use client';

import 'client-only';
import { Fragment } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { buttonLinkClassName } from '@/modules/shared/controls/button/buttonClassName';
import { PlusSignalIcon } from '@/modules/shared/icons/PlusSignalIcon';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';

export interface AddTaskProps extends ChildrenProps, ClassNamePropsOptional {
  readonly containerClassName?: string;
  readonly projectId?: string;
}

export const AddTask = ({ children, containerClassName, className, projectId }: AddTaskProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();

  const isAddingTask = () => searchParams.get('newTask') !== null;

  const onAddTask = () => {
    if (width >= 768) {
      if (!isAddingTask()) router.replace(`${pathname}?newTask=true`);
    } else {
      const projectIdQuery = projectId ? `?projectId=${projectId}` : '';
      router.push(`/app/tasks/new${projectIdQuery}`);
    }
  };

  return (
    <div {...(containerClassName && { className: containerClassName })}>
      <Transition
        show={!isAddingTask()}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 -translate-y-[50px]"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-[50px]"
      >
        <button
          onClick={onAddTask}
          className={twMerge(buttonLinkClassName, 'group py-4  flex-row self-start', className)}
        >
          <PlusSignalIcon
            width="1.25rem"
            height="1.25rem"
            className="fill-gray-600 mr-1 group-hover:fill-green-600"
          />
          Add task
        </button>
      </Transition>
      <Transition
        show={isAddingTask()}
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-[50px]"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[50px]"
      >
        {children}
      </Transition>
    </div>
  );
};
