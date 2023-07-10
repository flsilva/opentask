'use client';

import 'client-only';
import Button from '@/app/(marketing)/ui/Button';
import TaskDueDatePicker from './TaskDueDatePicker';

interface NewTaskProps {
  readonly onCancelClick: () => void;
  readonly onSaveClick: () => void;
}

export default function NewTask({ onCancelClick, onSaveClick }: NewTaskProps) {
  return (
    <form className="rounded-md bg-gray-100 px-2 py-6 sm:px-6">
      <input
        name="name"
        type="text"
        placeholder="Task name"
        className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
        required
      />
      <textarea
        name="description"
        placeholder="Task description"
        rows={2}
        className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
      ></textarea>
      <div className="flex items-center justify-between">
        <TaskDueDatePicker />
        <div className="flex justify-end gap-2 sm:gap-4">
          <Button color="white" onClick={onCancelClick}>
            Cancel
          </Button>
          <Button onClick={onSaveClick}>Add task</Button>
        </div>
      </div>
    </form>
  );
}
