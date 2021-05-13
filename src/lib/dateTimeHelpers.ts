export enum WeekDayEnum {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export const getWeekDay = (date: Date): WeekDayEnum => {
  const day = date.getDay();

  return Object.values(WeekDayEnum)[day];
};

export const humanDuration = (duration: string): string => {
  const durationSplit = duration.split(':');

  if (durationSplit.length === 2) {
    const [m] = durationSplit;
    return `${Number(m)}min`;
  }

  const [h, m] = durationSplit;

  if (h === '00') {
    return `${Number(m)}min`;
  } else if (!m) {
    return `${Number(h)}hrs.`;
  }

  return `${Number(h)}hrs. ${m}min`;
};
