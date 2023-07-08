'use client';

import { Dialog } from '@headlessui/react';
import { XIconSvg } from '@/shared/ui/XIconSvg';
import Button from '@/app/(marketing)/ui/Button';

interface CreateProjectModalProps {
  readonly open: boolean;
  readonly onCloseHandler: (showModal: boolean) => void;
  readonly title: string;
}

export default function CreateProjectModal({
  onCloseHandler,
  open,
  title,
}: CreateProjectModalProps) {
  console.log('CreateProjectModal() - open: ', open);

  const onCreateProjectClick = (showModal: boolean) => {
    console.log('CreateProjectModal() - onCreateProjectClick()');
  };

  return (
    <Dialog as="div" open={open} className="relative z-50" onClose={() => onCloseHandler(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center p-4">
        <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => onCloseHandler(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIconSvg aria-hidden="true" />
            </button>
          </div>
          <form className="mt-6">
            <input
              name="name"
              type="text"
              placeholder="Project name"
              className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
              required
            />
            <textarea
              name="description"
              placeholder="Project description"
              rows={5}
              className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
            ></textarea>
            <div className="flex justify-end gap-4">
              <Button color="white" onClick={() => onCloseHandler(false)}>
                Cancel
              </Button>
              <Button onClick={() => console.log('CreateProjectModal().save()')}>Save</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
