import { format } from 'date-fns';

export const TodayHeader = () => (
  <div className="flex flex-col">
    <div className="sticky top-0 flex w-full items-center bg-white py-8">
      <h1 className="text-lg font-semibold text-gray-800">Today</h1>
      <p className="ml-2 mt-1 text-xs text-gray-400">{format(new Date(), 'iii MMM d')}</p>
    </div>
  </div>
);
