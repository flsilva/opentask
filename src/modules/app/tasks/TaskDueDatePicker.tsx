'use client';

import 'client-only';
import { useEffect, useRef, useState } from 'react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarMonthIcon } from '@/modules/shared/icons/CalendarMonthIcon';
import { XIcon } from '@/modules/shared/icons/XIcon';
import { formatTaskDueDate } from './task-utils';
import { Modal } from '@/modules/shared/modals/Modal';

export interface TaskDueDatePickerProps {
  readonly defaultDate?: Date | undefined;
  readonly name?: string;
  readonly onChange: (date: Date | undefined) => void;
}

export const TaskDueDatePicker = ({ defaultDate, name, onChange }: TaskDueDatePickerProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    setSelectedDate(defaultDate);
  }, [defaultDate]);

  const handleChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsShowing(false);
    onChange(date);
  };

  const handleClose = (state: boolean) => {
    setIsShowing(state);
  };

  const datePickerProps: DayPickerSingleProps = {
    captionLayout: 'dropdown-buttons',
    disabled: { before: new Date() },
    fixedWeeks: true,
    fromMonth: new Date(),
    fromYear: new Date().getFullYear(),
    ISOWeek: true,
    mode: 'single',
    modifiersClassNames: {
      selected: '!bg-green-600 !text-white !opacity-100',
      today: 'my-today',
    },
    onSelect: handleChange,
    selected: selectedDate,
    showOutsideDays: true,
    toYear: new Date().getFullYear() + 2,
  };

  return (
    <>
      {name && (
        <input type="hidden" name={name} value={selectedDate ? selectedDate.toString() : ''} />
      )}
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
            onClick={() => handleChange(undefined)}
          >
            <span className="sr-only">Remove due date</span>
            <XIcon aria-hidden="true" />
          </button>
        )}
      </div>
      <Modal
        appear={isShowing}
        initialFocus={closeButtonRef}
        show={isShowing}
        onClose={() => handleClose(false)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start justify-center">
            <DayPicker {...datePickerProps} />
          </div>
          <button
            type="button"
            className="-m-2.5 rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
            onClick={() => handleClose(false)}
            ref={closeButtonRef}
          >
            <span className="sr-only">Close modal</span>
            <XIcon aria-hidden="true" />
          </button>
        </div>
      </Modal>
    </>
  );
};
