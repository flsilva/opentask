'use client';

import 'client-only';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarMonthIcon } from '@/modules/shared/icon/CalendarMonthIcon';
import { XIcon } from '@/modules/shared/icon/XIcon';
import { formatTaskDueDate } from './task-utils';

interface TaskDueDatePickerProps {
  readonly defaultDate?: Date | undefined;
  readonly onChange: (date: Date | undefined) => void;
}

export default function TaskDueDatePicker({ defaultDate, onChange }: TaskDueDatePickerProps) {
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
      <Transition show={isShowing} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={closeButtonRef}
          onClose={() => handleClose(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex md:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[28rem]">
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
