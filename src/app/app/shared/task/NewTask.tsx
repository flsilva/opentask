'use client';

import 'client-only';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import Button from '@/app/shared/ui/button/Button';
import TaskDueDatePicker from './TaskDueDatePicker';

interface NewTaskProps {
  readonly onCancelClick: () => void;
  readonly onSaveClick: () => void;
}

export default function NewTask({ onCancelClick, onSaveClick }: NewTaskProps) {
  const NAME_PLACEHOLDER = 'Task name';
  const DESCRIPTION_PLACEHOLDER = 'Task description';

  const [name, setName] = useState(NAME_PLACEHOLDER);
  const [description, setDescription] = useState(DESCRIPTION_PLACEHOLDER);

  const onNameFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '' && event.target.innerHTML !== NAME_PLACEHOLDER) return;
    setName('');
  };

  const onNameBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '') return;
    setName(NAME_PLACEHOLDER);
  };

  const onNameChangeHandler = (event: { target: { value: string } }) => {
    if (event.target === null || event.target === undefined) return;
    setName(event.target.value);
  };

  const onDescriptionFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '' && event.target.innerHTML !== DESCRIPTION_PLACEHOLDER) return;
    setDescription('');
  };

  const onDescriptionBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '') return;
    setDescription(DESCRIPTION_PLACEHOLDER);
  };

  const onDescriptionChangeHandler = (event: { target: { value: string } }) => {
    if (event.target === null || event.target === undefined) return;
    setDescription(event.target.value);
  };

  const nameAndDescriptionClassName =
    'mb-3 block w-full rounded-md border border-gray-400 bg-white px-3 py-1.5 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0';

  const nameClassName = `${nameAndDescriptionClassName} ${
    name === NAME_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'
  }`;

  const descriptionClassName = `${nameAndDescriptionClassName} ${
    description === DESCRIPTION_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'
  }`;

  return (
    <form className="rounded-md bg-gray-100 px-2 py-6 sm:px-6">
      <ContentEditable
        className={nameClassName}
        html={name}
        onBlur={onNameBlurHandler}
        onFocus={onNameFocusHandler}
        onChange={onNameChangeHandler}
      />
      <ContentEditable
        className={descriptionClassName}
        html={description}
        onBlur={onDescriptionBlurHandler}
        onFocus={onDescriptionFocusHandler}
        onChange={onDescriptionChangeHandler}
      />
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
