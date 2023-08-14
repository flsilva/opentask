import { differenceInCalendarDays, format, isToday, isTomorrow, startOfDay } from 'date-fns';

export const formatTaskDueDate = (date: Date | null | undefined) => {
  if (!date) return 'Due date';
  const diffDays = differenceInCalendarDays(date, new Date());

  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';

  if (diffDays >= 0 && diffDays < 7) {
    return format(date, 'EEEE');
  } else if (diffDays === -1) {
    return 'Yesterday';
  }
  return format(date, 'MMM dd');
};
