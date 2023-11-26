'use client';

import 'client-only';
import { useEffect, useState } from 'react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ServerResponse } from '@/modules/shared/data-access/ServerResponse';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { CalendarMonthIcon } from '@/modules/shared/icon/CalendarMonthIcon';
import { XIcon } from '@/modules/shared/icon/XIcon';
import { formatTaskDueDate } from './formatTaskDueDate';
import { TaskDto, updateTask } from './TasksRepository';

export interface TaskDueDatePickerProps {
  readonly defaultDate?: Date | undefined;
  readonly name?: string;
  readonly onChange: (response: ServerResponse<TaskDto | undefined>) => void;
  readonly taskId?: string;
}

export const TaskDueDatePicker = ({
  defaultDate,
  name,
  onChange,
  taskId,
}: TaskDueDatePickerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    setSelectedDate(defaultDate);
  }, [defaultDate]);

  const handleChange = async (date: Date | undefined) => {
    setSelectedDate(date);
    setIsDialogOpen(false);

    if (!taskId) return;

    date?.setHours(new Date().getHours());
    date?.setMinutes(new Date().getMinutes());

    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('dueDate', date === undefined ? 'null' : String(date));

    const response = await updateTask(undefined, formData);

    if (onChange) onChange(response);
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

  const openDialogButton = (
    <button type="button" className="flex rounded-md p-1.5 hover:bg-gray-200">
      <span className="sr-only">Add due date</span>
      <CalendarMonthIcon aria-hidden="true" />
      <span className="ml-2 ">{formatTaskDueDate(selectedDate, new Date())}</span>
    </button>
  );

  return (
    <div className="flex flex-row">
      {name && (
        <input type="hidden" name={name} value={selectedDate ? selectedDate.toString() : ''} />
      )}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onOpenAutoFocus={(event: Event) => event.preventDefault()}
        trigger={openDialogButton}
        noCloseButton
      >
        <div className="flex grow justify-center">
          <DayPicker {...datePickerProps} />
        </div>
      </Dialog>
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
  );
};
