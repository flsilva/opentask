import { differenceInCalendarDays, format, isToday, isTomorrow, startOfDay } from 'date-fns';

export const formatTaskDueDate = (date: Date | null | undefined) => {
  if (!date) return 'Due date';
  const diffDays = differenceInCalendarDays(new Date(), date);

  if (diffDays >= -6) {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE');
  }
  return format(date, 'MMM dd');
};
