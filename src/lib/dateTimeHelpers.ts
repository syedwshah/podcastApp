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
  const [hr, min] = duration.split(':');

  return `${Number(hr)}hrs. ${min}min`;
};
