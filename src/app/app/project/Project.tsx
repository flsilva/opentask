'use client';

import 'client-only';
import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { differenceInCalendarDays, format, isToday, isTomorrow, startOfDay } from 'date-fns';
import { MoreHorizontalSvg } from '@/shared/ui/MoreHorizontalSvg';
import { CalendarMonthSvg } from '@/shared/ui/CalendarMonthSvg';
import TaskList from './task/TaskList';
import { ProjectData } from './ProjectData';
import { TaskData } from './task/TaskData';
import Button from '@/app/(marketing)/ui/Button';
import { XIconSvg } from '@/shared/ui/XIconSvg';

interface ProjectProps {
  readonly project: ProjectData;
  readonly tasks: Array<TaskData>;
}

interface NewTaskProps {
  readonly onCancelClick: () => void;
  readonly onSaveClick: () => void;
}

/* Docs
 * https://github.com/OMikkel/tailwind-datepicker-react
 */
const taskDueDatePickerOptions = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  minDate: startOfDay(new Date()),
  theme: {
    background: 'bg-green-700 dark:bg-green-700',
    disabledText:
      'text-gray-300 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent cursor-default',
    icons: 'bg-green-700 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500',
    text: 'bg-green-700 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500',
    selected: 'bg-green-500 dark:bg-green-500',
  },
  datepickerClassNames: 'top-auto bottom-10',
  defaultDate: startOfDay(new Date()),
  language: 'en',
};

const TaskDueDatePicker = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClose = (state: boolean) => {
    setIsShowing(state);
  };

  const displayDateText = () => {
    if (selectedDate === null) return 'Due date';
    const diffDays = differenceInCalendarDays(new Date(), selectedDate);

    if (diffDays >= -6) {
      if (isToday(selectedDate)) return 'Today';
      if (isTomorrow(selectedDate)) return 'Tomorrow';
      return format(selectedDate, 'EEEE');
    }
    return format(selectedDate, 'MMM dd');
  };

  return (
    <div className="relative">
      <div
        className={`fixed inset-0 bg-black/30 ${isShowing ? '' : 'hidden'}`}
        aria-hidden="true"
        onClick={() => setIsShowing(false)}
      />
      <Datepicker
        options={taskDueDatePickerOptions}
        onChange={handleChange}
        show={isShowing}
        setShow={handleClose}
      >
        <div className="flex flex-row">
          <button
            type="button"
            className="flex rounded-md p-2 hover:bg-gray-300"
            onClick={() => setIsShowing(!isShowing)}
          >
            <span className="sr-only">Add due date</span>
            <CalendarMonthSvg aria-hidden="true" />
            <span className="ml-2 ">{displayDateText()}</span>
          </button>
          {selectedDate && (
            <button
              type="button"
              className="flex rounded-md py-2 hover:bg-gray-300 sm:px-2"
              onClick={() => setSelectedDate(null)}
            >
              <span className="sr-only">Remove due date</span>
              <XIconSvg aria-hidden="true" />
            </button>
          )}
        </div>
      </Datepicker>
    </div>
  );
};

const NewTask = ({ onCancelClick, onSaveClick }: NewTaskProps) => (
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

export default function Project({ project, tasks }: ProjectProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const newTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  const saveNewTaskHandler = () => {
    console.log('Project().saveNewTaskHandler()');
  };

  return (
    <div className="flex flex-col pb-8">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <MoreHorizontalSvg />
      </div>
      <p className="mb-8 block text-sm">{project.description}</p>
      <TaskList tasks={tasks} />
      {!isAddingTask && (
        <Button onClick={newTaskHandler} className="mb-44 mt-4 flex-row self-start">
          Add task
        </Button>
      )}
      {isAddingTask && (
        <NewTask onCancelClick={cancelNewTaskHandler} onSaveClick={saveNewTaskHandler} />
      )}
    </div>
  );
}
