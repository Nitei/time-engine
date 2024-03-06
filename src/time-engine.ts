/**
 * @example time(new Date())
 * @example time('2029/09/07')
 * @example time('2025-10-06')
 * @example time('25/07/2020')
 * @example time('02-12-1990')
 */

const toolsUtils = {
  date: {
    create(dateable: string | number | Date) {
      const d = new Date(dateable ? dateable : '');
      (d as any).isValid = () => !isNaN(d.getFullYear());
      return d as Date & { isValid: () => boolean };
    },
  },
};

/**************************************************************************
 *                            Main
 **************************************************************************/

export const time = (date: string | Date) => {
  const list = getDateAsStringList(date);

  const toDDMMYYYY = (newSeparator: string) => list.join(newSeparator);
  const toYYYYMMDD = (newSeparator: string) =>
    list.reverse().join(newSeparator);

  const getAsArrayDDMMYYYY = () => list;
  const getAsArrayYYYYMMDD = () => list.reverse();
  const getAsDate = () => toolsUtils.date.create(toYYYYMMDD('-'));
  const getDayMonthYear = () => ({
    day: list[0],
    month: list[1],
    year: list[2],
  });
  const addDay = (numbr: number) => {
    const newDate = getAsDate();
    newDate.setDate(newDate.getDate() + numbr);
    return time(newDate);
  };
  const addMonth = (numbr: number) => {
    const newDate = getAsDate();
    newDate.setMonth(newDate.getMonth() + numbr);
    return time(newDate);
  };
  const addYear = (numbr: number) => {
    const newDate = getAsDate();
    newDate.setFullYear(newDate.getFullYear() + numbr);
    return time(newDate);
  };

  return {
    addDay,
    addMonth,
    addYear,
    isValidDate,
    getAsDate,
    getDayMonthYear,
    getAsArrayDDMMYYYY,
    getAsArrayYYYYMMDD,
    /** @example  time('02/12/1990').toDDMMYYYY('-') */
    toDDMMYYYY,
    /** @example  time('02-12-1990').toYYYYMMDD('/') */
    toYYYYMMDD,
  };
};

/**************************************************************************
 *                            Utils
 **************************************************************************/

const getInTwoDigits = (numbr: number) =>
  numbr < 10 ? `0${numbr}` : `${numbr}`;

const format = (date: string) => ({
  isYYYYMMDD: new RegExp(/^\d{4}\D+\d{2}\D+\d{2}$/).test(date),
  isDDMMYYYY: new RegExp(/^\d{2}\D+\d{2}\D+\d{4}$/).test(date),
});

/**
 * @example
 * getDateAsStringList(toolsUtils.date.create) => ['day', 'month', 'year'] // -> ['01', '02', '2021']
 */
function getDateAsStringList(date: Date | string) {
  const dateList = [] as unknown as [string, string, string];
  const newDate = toDate(date);

  if (newDate) {
    const day = getInTwoDigits((newDate as Date).getDate());
    const month = getInTwoDigits((newDate as Date).getMonth() + 1);
    const year = getInTwoDigits((newDate as Date).getFullYear());

    dateList.push(day);
    dateList.push(month);
    dateList.push(year);
  }

  return dateList;
}

function toDate(date: Date | string) {
  const { isValidDateInstance, isDateable, isDDMMYYYY, isYYYYMMDD } =
    isValidDate(date);

  if (isValidDateInstance) {
    return date;
  }
  if (isYYYYMMDD) {
    const separator = (date as string).charAt(4);

    return toolsUtils.date.create((date as string).split(separator).join('-'));
  }
  if (isDDMMYYYY) {
    const separator = (date as string).charAt(2);
    const dateStringDDMMYYY = (date as string)
      .split(separator)
      .reverse()
      .join('-');

    return toolsUtils.date.create(dateStringDDMMYYY);
  }
  if (isDateable) {
    return toolsUtils.date.create(date);
  }

  return undefined;
}

function isValidDate(date: any) {
  const isValidDateInstance =
    date instanceof Date && !isNaN(toolsUtils.date.create(date) as any);

  return {
    isValidDateInstance,
    isDateable: toolsUtils.date.create(date).isValid(),
    ...format(date),
  };
}
