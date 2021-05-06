import {getWeekDay, humanDuration, WeekDayEnum} from './dateTimeHelpers';

describe('dateTimeHelpers', () => {
  describe('#getWeekDay()', () => {
    test.each`
      date                                    | expected
      ${new Date('2021-05-02T20:31:53.102Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2021-05-03T20:31:53.102Z')} | ${WeekDayEnum.Monday}
      ${new Date('2021-05-04T20:31:53.102Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2021-05-05T20:31:53.102Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2021-05-06T16:24:59.636Z')} | ${WeekDayEnum.Thursday}
      ${new Date('2021-05-07T20:31:53.102Z')} | ${WeekDayEnum.Friday}
      ${new Date('2021-05-08T20:31:53.102Z')} | ${WeekDayEnum.Saturday}
    `('should return $expected for the given date', ({date, expected}) => {
      expect(getWeekDay(date)).toBe(expected);
    });
  });

  describe('#humanDuration()', () => {
    it('should return the human readable duration', () => {
      expect(humanDuration('03:13:00')).toBe('3hrs. 13min');
      expect(humanDuration('14:13:00')).toBe('14hrs. 13min');
      expect(humanDuration('00:10:00')).toBe('0hrs. 10min');
    });
  });

  describe('#humanDurationMoreDetailed()', () => {
    test.each`
      stringInput   | expected
      ${'03:13:00'} | ${'3hrs. 13min'}
      ${'14:13:00'} | ${'14hrs. 13min'}
      ${'00:10:00'} | ${'0hrs. 10min'}
    `(
      'should return $expected for the giving $stringInput',
      ({stringInput, expected}) => {
        expect(humanDuration(stringInput)).toBe(expected);
      },
    );
  });
});
