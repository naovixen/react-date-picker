import { Days } from "../enums/Days";

interface IDateSetOptions {
    year?: number;
    month?: number;
    day?: number;
}

interface IDateOptions {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

interface IDayInfo {
    number: number;
    month: number;
}

export class DateHelper {
    private static readonly _second: number = 1000;
    private static readonly _minute: number = 60 * DateHelper._second;
    private static readonly _hour: number = 60 * DateHelper._minute;
    private static readonly _daysInWeek: number = 7;

    public static isLeapYear(year: number): boolean {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    }

    public static getDaysOfWeekStrings(firstDayOfWeek: Days): Array<string> {
        // Replace for i18n
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return DateHelper._shiftArrayBackward(days, firstDayOfWeek);
    }

    public static getDaysInMonth(date: Date): Array<number> {
        const days = [];
        for (let i = 1; i <= DateHelper._getDaysInMonthCount(date); i++) {
            days.push(i);
        }
        return days;
    }

    public static getPrefixedDaysInPrevMonth(date: Date, firstDayOfWeek: Days): Array<number> {
        const remaining = DateHelper._getPrefixedDaysInPrevMonthCount(date, firstDayOfWeek);
        const end = DateHelper._getEndOfMonth(DateHelper.sub(date, { months: 1 })).getDate();
        const start = end - remaining + 1;
        const days = [];
        for (let i = start; i <= end; i++) {
            days.push(i);
        }
        return days;
    }

    public static getSuffixedDaysInNextMonth(date: Date, firstDayOfWeek: Days): Array<number> {
        const remaining = DateHelper._getSuffixedDaysInNextMonthCount(date, firstDayOfWeek);
        const days = [];
        for (let i = 1; i <= remaining; i++) {
            days.push(i);
        }
        return days;
    }

    public static getWeeksInMonth(date: Date, firstDayOfWeek: Days): Array<Array<IDayInfo>> {
        const newDate = new Date(date);
        const prevMonth = DateHelper.sub(newDate, { months: 1 }).getMonth();
        const nextMonth = DateHelper.add(newDate, { months: 1 }).getMonth();

        const daysOfPrevMonth: Array<IDayInfo> = DateHelper.getPrefixedDaysInPrevMonth(newDate, firstDayOfWeek).map((day) => ({
            month: prevMonth,
            number: day
        }));

        const daysOfCurrentMonth: Array<IDayInfo> = DateHelper.getDaysInMonth(newDate).map((day) => ({
            month: newDate.getMonth(),
            number: day
        }));

        const daysOfNextMonth: Array<IDayInfo> = DateHelper.getSuffixedDaysInNextMonth(newDate, firstDayOfWeek).map((day) => ({
            month: nextMonth,
            number: day
        }));

        const allDays = [daysOfPrevMonth, daysOfCurrentMonth, daysOfNextMonth].flat();
        return DateHelper._splitArrayIntoChunks(allDays, DateHelper._daysInWeek);
    }

    public static set(date: Date, options: IDateSetOptions): Date {
        const newDate = new Date(date);

        if (options.month !== undefined || options.day !== undefined) {
            newDate.setMonth(options.month ?? newDate.getMonth(), options.day ?? newDate.getDate());
        }

        if (options.year !== undefined) {
            newDate.setFullYear(options.year);
        }

        return newDate;
    }

    public static add(date: Date, options: IDateOptions): Date {
        let newDate = new Date(date);

        if (options.seconds !== undefined) {
            newDate = DateHelper._addSeconds(newDate, options.seconds);
        }

        if (options.minutes !== undefined) {
            newDate = DateHelper._addMinutes(newDate, options.minutes);
        }

        if (options.hours !== undefined) {
            newDate = DateHelper._addHours(newDate, options.hours);
        }

        if (options.days !== undefined) {
            newDate = DateHelper._addDays(newDate, options.days);
        }

        if (options.weeks !== undefined) {
            newDate = DateHelper._addWeeks(newDate, options.weeks);
        }

        if (options.months !== undefined) {
            newDate = DateHelper._addMonths(newDate, options.months);
        }

        if (options.years !== undefined) {
            newDate = DateHelper._addYears(newDate, options.years);
        }

        return newDate;
    }

    public static sub(date: Date, options: IDateOptions): Date {
        let newDate = new Date(date);

        if (options.seconds !== undefined) {
            newDate = DateHelper._subtractSeconds(newDate, options.seconds);
        }

        if (options.minutes !== undefined) {
            newDate = DateHelper._subtractMinutes(newDate, options.minutes);
        }

        if (options.hours !== undefined) {
            newDate = DateHelper._subtractHours(newDate, options.hours);
        }

        if (options.days !== undefined) {
            newDate = DateHelper._subtractDays(newDate, options.days);
        }

        if (options.weeks !== undefined) {
            newDate = DateHelper._subtractWeeks(newDate, options.weeks);
        }

        if (options.months !== undefined) {
            newDate = DateHelper._subtractMonths(newDate, options.months);
        }

        if (options.years !== undefined) {
            newDate = DateHelper._subtractYears(newDate, options.years);
        }

        return newDate;
    }

    private static _orderPrefixedDaysOfWeek(firstDayOfWeek: Days): Array<number> {
        const array = [...Array(DateHelper._daysInWeek).keys()];
        return DateHelper._shiftArrayBackward(array, firstDayOfWeek);
    }

    private static _orderSuffixedDaysOfWeek(firstDayOfWeek: Days): Array<number> {
        const array = [...Array(DateHelper._daysInWeek).keys()];
        return DateHelper._shiftArrayForward(array, firstDayOfWeek);
    }

    private static _getPrefixedDaysInPrevMonthCount(date: Date, firstDayOfWeek: number): number {
        const index = DateHelper._orderSuffixedDaysOfWeek(firstDayOfWeek);
        return index[DateHelper._getStartOfMonth(date).getDay()];
    }

    private static _getSuffixedDaysInNextMonthCount(date: Date, firstDayOfWeek: number): number {
        const index = DateHelper._orderPrefixedDaysOfWeek(firstDayOfWeek);
        return index[6 - DateHelper._getEndOfMonth(date).getDay()];
    }

    private static _getStartOfMonth(date: Date): Date {
        const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
        return newDate;
    }

    private static _getEndOfMonth(date: Date): Date {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return newDate;
    }

    private static _getDaysInMonthCount(date: Date): number {
        const year = date.getFullYear();
        const month = date.getMonth();

        return [31, (DateHelper.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    private static _subtractYears(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() - amount);
        return newDate;
    }

    private static _addYears(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + amount);
        return newDate;
    }

    private static _subtractMonths(date: Date, amount: number): Date {
        const newDate = new Date(date);
        const day = newDate.getDate();
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - amount);
        newDate.setDate(Math.min(day, DateHelper._getDaysInMonthCount(newDate)));
        return newDate;
    }

    private static _addMonths(date: Date, amount: number): Date {
        const newDate = new Date(date);
        const day = newDate.getDate();
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + amount);
        newDate.setDate(Math.min(day, DateHelper._getDaysInMonthCount(newDate)));
        return newDate;
    }

    private static _subtractWeeks(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - (amount * DateHelper._daysInWeek));
        return newDate;
    }

    private static _addWeeks(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + (amount * DateHelper._daysInWeek));
        return newDate;
    }

    private static _subtractDays(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - amount);
        return newDate;
    }

    private static _addDays(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + amount);
        return newDate;
    }

    private static _subtractHours(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setTime(newDate.getTime() - (amount * DateHelper._hour));
        return newDate;
    }

    private static _addHours(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setTime(newDate.getTime() + (amount * DateHelper._hour));
        return newDate;
    }

    private static _subtractMinutes(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setTime(newDate.getTime() - (amount * DateHelper._minute));
        return newDate;
    }

    private static _addMinutes(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setTime(newDate.getTime() + (amount * DateHelper._minute));
        return newDate;
    }

    private static _subtractSeconds(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setTime(newDate.getTime() - (amount * DateHelper._second));
        return newDate;
    }

    private static _addSeconds(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setTime(newDate.getTime() + (amount * DateHelper._second));
        return newDate;
    }

    private static _shiftArrayBackward<T>(array: Array<T>, amount: number): Array<T> {
        return array.slice(amount).concat(array.slice(0, amount));
    }

    private static _shiftArrayForward<T>(array: Array<T>, amount: number): Array<T> {
        return array.slice(array.length - amount).concat(array.slice(0, array.length - amount));
    }

    private static _splitArrayIntoChunks<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
        const newArray = [...array];
        const result = [];
        for (let i = 0; i < newArray.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }
}
