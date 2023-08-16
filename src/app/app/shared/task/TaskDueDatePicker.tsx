'use client';

import 'client-only';
import { useEffect, useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { startOfDay } from 'date-fns';
import { CalendarMonthIcon } from '@/app/shared/ui/icon/CalendarMonthIcon';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import { formatTaskDueDate } from './task-utils';

/*
 * Docs
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
      '!text-gray-400 hover:bg-transparent !dark:text-gray-400 dark:hover:bg-transparent cursor-default hover:cursor-default',
    icons: 'bg-green-700 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500',
    text: 'bg-green-700 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500',
    selected: 'bg-green-500 dark:bg-green-500',
  },
  datepickerClassNames: '-top-40 md:top-auto bottom-10',
  defaultDate: startOfDay(new Date()),
  language: 'en',
};

interface TaskDueDatePickerProps {
  readonly defaultDate?: Date | null | undefined;
  readonly onChange: (date: Date | null) => void;
}

export default function TaskDueDatePicker({ defaultDate, onChange }: TaskDueDatePickerProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(defaultDate);

  useEffect(() => setSelectedDate(defaultDate), [defaultDate]);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date);
  };

  const handleClose = (state: boolean) => {
    setIsShowing(state);
  };

  return (
    <div className="relative">
      <div
        className={`fixed inset-0 z-50 bg-black/30  ${isShowing ? '' : 'hidden'}`}
        aria-hidden="true"
        onClick={() => setIsShowing(false)}
      />
      <Datepicker
        options={{ ...taskDueDatePickerOptions, defaultDate }}
        onChange={handleChange}
        show={isShowing}
        setShow={handleClose}
      >
        <div className="flex flex-row">
          <button
            type="button"
            className="flex rounded-md p-1.5 hover:bg-gray-200"
            onClick={() => setIsShowing(!isShowing)}
          >
            <span className="sr-only">Add due date</span>
            <CalendarMonthIcon aria-hidden="true" />
            <span className="ml-2 ">{formatTaskDueDate(selectedDate)}</span>
          </button>
          {selectedDate && (
            <button
              type="button"
              className="flex rounded-md p-1.5 hover:bg-gray-200"
              onClick={() => handleChange(null)}
            >
              <span className="sr-only">Remove due date</span>
              <XIcon aria-hidden="true" />
            </button>
          )}
        </div>
      </Datepicker>
    </div>
  );
}
