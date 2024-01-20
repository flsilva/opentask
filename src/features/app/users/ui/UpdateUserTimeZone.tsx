'use client';

import 'client-only';
import { isToday } from 'date-fns';
import { useEffect } from 'react';
import { updateTimeZone } from '../data-access/UsersDataAccess';

const TIME_ZONE_UPDATED_AT_VAR_NAME = 'UserTimeZoneUpdatedAt';

export const UpdateUserTimeZone = () => {
  useEffect(() => {
    if (!window || !localStorage) return;

    const update = async () => {
      try {
        const timeZoneUpdatedAt = localStorage.getItem(TIME_ZONE_UPDATED_AT_VAR_NAME);

        /*
         * We only update the user's time zone once a day.
         */
        if (typeof timeZoneUpdatedAt === 'string' && isToday(new Date(timeZoneUpdatedAt))) return;
        /**/

        try {
          await updateTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
          localStorage.setItem(TIME_ZONE_UPDATED_AT_VAR_NAME, new Date().toString());
        } catch {}
      } catch {}
    };

    update();
  }, []);

  return null;
};
