'use client';

import 'client-only';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function TodayHeader() {
  const [todayStr, setTodayStr] = useState('');

  useEffect(() => {
    setTodayStr(format(new Date(), 'iii MMM d'));
  }, []);

  return (
    <div className="flex flex-col pb-8">
      <div className="sticky top-0 flex w-full items-center bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">Today</h1>
        <p className="ml-2 mt-1 text-xs text-gray-400">{todayStr}</p>
      </div>
    </div>
  );
}
