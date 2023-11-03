'use client';

import 'client-only';
import { useEffect, useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    setSelectedDate(defaultDate);
  }, [defaultDate]);

  const handleChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange(date);
    setIsModalOpen(false);
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

  const modalTrigger = (
    <button type="button" className="flex rounded-md p-1.5 hover:bg-gray-200">
      <span className="sr-only">Add due date</span>
      <CalendarMonthIcon aria-hidden="true" />
      <span className="ml-2 ">{formatTaskDueDate(selectedDate)}</span>
    </button>
  );

  return (
    <>
      {name && (
        <input type="hidden" name={name} value={selectedDate ? selectedDate.toString() : ''} />
      )}
      <div className="flex flex-row">
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onOpenAutoFocus={(event: Event) => event.preventDefault()}
          trigger={modalTrigger}
          noCloseButton
        >
          <div className="flex grow justify-center">
            <DayPicker {...datePickerProps} />
          </div>
        </Modal>
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
    </>
  );
};
