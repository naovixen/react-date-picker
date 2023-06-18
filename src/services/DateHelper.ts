import { Day } from "../enums/Day";

interface IDateSetOptions {
    year?: number;
    month?: number;
    week?: number;
    day?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
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
    private static _second = 1000;
    private static _minute = 60 * this._second;
    private static _hour = 60 * this._minute;
    private static _daysInWeek = 7;

    public static isLeapYear = (year: number) => {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    }

    public static getDaysOfWeekStrings = (firstDayOfWeek: Day): Array<string> => {
        // Replace for i18n
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return this._shiftArrayBackward(days, firstDayOfWeek);
    }

    public static getDaysInMonth = (date: Date): Array<number> => {
        let days = [];
        for (let i = 1; i <= this._getDaysInMonthCount(date); i++) {
            days.push(i);
        }
        return days;
    }

    public static getSuffixedDaysInPrevMonth = (date: Date, firstDayOfWeek: Day): Array<number> => {
        const remaining = this._getSuffixedDaysInPrevMonthCount(date, firstDayOfWeek);
        const end = this._getEndOfMonth(this.sub(date, { months: 1 })).getDate();
        const start = end - remaining + 1;
        let days = [];
        for (let i = start; i <= end; i++) {
            days.push(i);
        }
        return days;
    }

    public static getPrefixedDaysInNextMonth = (date: Date, firstDayOfWeek: Day): Array<number> => {
        const remaining = this._getPrefixedDaysInNextMonthCount(date, firstDayOfWeek);
        let days = [];
        for (let i = 1; i <= remaining; i++) {
            days.push(i);
        }
        return days;
    }

    public static getWeeksInMonth = (date: Date, firstDayOfWeek: Day): Array<Array<IDayInfo>> => {
        const newDate = new Date(date);
        const prevMonth = this.sub(newDate, { months: 1 }).getMonth();
        const nextMonth = this.add(newDate, { months: 1 }).getMonth();

        const daysOfPrevMonth: Array<IDayInfo> = this.getSuffixedDaysInPrevMonth(newDate, firstDayOfWeek).map((day) => ({
            number: day,
            month: prevMonth
        }));

        const daysOfCurrentMonth: Array<IDayInfo> = this.getDaysInMonth(newDate).map((day) => ({
            number: day,
            month: newDate.getMonth()
        }));

        const daysOfNextMonth: Array<IDayInfo> = this.getPrefixedDaysInNextMonth(newDate, firstDayOfWeek).map((day) => ({
            number: day,
            month: nextMonth
        }));

        const allDays = [daysOfPrevMonth, daysOfCurrentMonth, daysOfNextMonth].flat();
        return this._splitArrayIntoChunks(allDays, this._daysInWeek);
    }

    public static set = (date: Date, options: IDateSetOptions): Date => {
        let newDate = new Date(date);

        if (options.day !== undefined) {
            newDate.setDate(options.day);
        }

        return newDate;
    }

    public static add = (date: Date, options: IDateOptions): Date => {
        let newDate = new Date(date);

        if (options.years !== undefined) {
            newDate = this._addYears(newDate, options.years);
        }

        if (options.months !== undefined) {
            newDate = this._addMonths(newDate, options.months);
        }

        if (options.weeks !== undefined) {
            newDate = this._addWeeks(newDate, options.weeks);
        }

        if (options.days !== undefined) {
            newDate = this._addDays(newDate, options.days);
        }

        if (options.hours !== undefined) {
            newDate = this._addHours(newDate, options.hours);
        }

        if (options.minutes !== undefined) {
            newDate = this._addMinutes(newDate, options.minutes);
        }

        if (options.seconds !== undefined) {
            newDate = this._addSeconds(newDate, options.seconds);
        }

        return newDate;
    }

    public static sub = (date: Date, options: IDateOptions): Date => {
        let newDate = new Date(date);

        if (options.years !== undefined) {
            newDate = this._subtractYears(newDate, options.years);
        }

        if (options.months !== undefined) {
            newDate = this._subtractMonths(newDate, options.months);
        }

        if (options.weeks !== undefined) {
            newDate = this._subtractWeeks(newDate, options.weeks);
        }

        if (options.days !== undefined) {
            newDate = this._subtractDays(newDate, options.days);
        }

        if (options.hours !== undefined) {
            newDate = this._subtractHours(newDate, options.hours);
        }

        if (options.minutes !== undefined) {
            newDate = this._subtractMinutes(newDate, options.minutes);
        }

        if (options.seconds !== undefined) {
            newDate = this._subtractSeconds(newDate, options.seconds);
        }

        return newDate;
    }

    private static _orderPrefixedDaysOfWeek(firstDayOfWeek: Day): Array<number> {
        const array = [...Array(this._daysInWeek).keys()];
        return this._shiftArrayForward(array, firstDayOfWeek);
    }

    private static _orderSuffixedDaysOfWeek(firstDayOfWeek: Day): Array<number> {
        const array = [...Array(this._daysInWeek).keys()];
        return this._shiftArrayBackward(array, firstDayOfWeek);
    }

    private static _getSuffixedDaysInPrevMonthCount(date: Date, firstDayOfWeek: number): number {
        const index = this._orderPrefixedDaysOfWeek(firstDayOfWeek)
        return index[this._getStartOfMonth(date).getDay()];
    }

    private static _getPrefixedDaysInNextMonthCount(date: Date, firstDayOfWeek: number): number {
        const index = this._orderSuffixedDaysOfWeek(firstDayOfWeek)
        return index[6 - this._getEndOfMonth(date).getDay()];
    }

    private static _getStartOfMonth(date: Date): Date {
        const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
        return newDate;
    }

    private static _getEndOfMonth(date: Date): Date {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return newDate;
    }

    private static _getDaysInMonthCount = (date: Date): number => {
        const year = date.getFullYear();
        const month = date.getMonth();

        return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    private static _subtractYears = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setFullYear(newDate.getFullYear() - amount);
        return newDate;
    }

    private static _addYears = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setFullYear(newDate.getFullYear() + amount);
        return newDate;
    }

    private static _subtractMonths = (date: Date, amount: number): Date => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - amount);
        newDate.setDate(Math.min(day, this._getDaysInMonthCount(newDate)));
        return newDate;
    }

    private static _addMonths = (date: Date, amount: number): Date => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + amount);
        newDate.setDate(Math.min(day, this._getDaysInMonthCount(newDate)));
        return newDate;
    }

    private static _subtractWeeks = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - (amount * this._daysInWeek));
        return newDate;
    }

    private static _addWeeks = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + (amount * this._daysInWeek));
        return newDate;
    }

    private static _subtractDays = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - amount);
        return newDate;
    }

    private static _addDays = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + amount);
        return newDate;
    }

    private static _subtractHours = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() - (amount * this._hour));
        return newDate;
    }

    private static _addHours = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() + (amount * this._hour));
        return newDate;
    }

    private static _subtractMinutes = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() - (amount * this._minute));
        return newDate;
    }

    private static _addMinutes = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() + (amount * this._minute));
        return newDate;
    }

    private static _subtractSeconds = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() - (amount * this._second));
        return newDate;
    }

    private static _addSeconds = (date: Date, amount: number): Date => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() + (amount * this._second));
        return newDate;
    }

    private static _shiftArrayBackward(array: Array<any>, amount: number) {
        return array.slice(amount).concat(array.slice(0, amount))
    }

    private static _shiftArrayForward(array: Array<any>, amount: number) {
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
