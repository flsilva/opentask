import { differenceInCalendarDays, format } from 'date-fns';

export const formatTaskDueDate = (date: Date | null | undefined, now: Date) => {
  if (!date || !now) return 'Due date';
  const diffDays = differenceInCalendarDays(date, now);

  if (diffDays === -1) return 'Yesterday';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';

  if (diffDays > 1 && diffDays < 7) return format(date, 'EEEE');
  return format(date, 'MMM dd');
};
