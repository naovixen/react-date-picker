import { CalendarPosition } from "../components/calendar-table/enums/CalendarPosition";
import { ICalendarDay } from "../components/calendar-table/interfaces/ICalendarDay";
import { Day } from "../enums/Day";

export class DateHelper2 {
    private static _daysInAWeek = 7;

    public static daysOfMonth = (date: Date): number[] => {
        let days = [];
        for (let i = 1; i <= this._daysOfMonthCount(date); i++) {
            days.push(i);
        }
        return days;
    }

    public static CalendarWeeks(date: Date, firstDay: Day): Array<Array<ICalendarDay>> {
        const newDate = new Date(date);

        const daysOfPrevMonth: Array<ICalendarDay> = this.daysOfPrevMonth(newDate, firstDay).map((date) => ({
            date: date,
            position: CalendarPosition.Prev
        }));

        const daysOfCurrentMonth: Array<ICalendarDay> = this.daysOfMonth(newDate).map((date) => ({
            date: date,
            position: CalendarPosition.Current
        }));

        const daysOfNextMonth: Array<ICalendarDay> = this.daysOfNextMonth(newDate, firstDay).map((date) => ({
            date: date,
            position: CalendarPosition.Next
        }));

        const allDays = [daysOfPrevMonth, daysOfCurrentMonth, daysOfNextMonth].flat();
        return this._splitDaysIntoWeeks(allDays);
    }

    public static daysOfWeek(firstDay: Day): Array<string> {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return this._shiftArrayBackward(days, firstDay);
    }

    public static daysOfPrevMonth = (date: Date, firstDay: Day): number[] => {
        const remaining = this._daysOfprevMonthCount(date, firstDay);
        const end = this._endOfMonth(this.prevMonth(date)).getDate();
        const start = end - remaining + 1;
        let days = [];
        for (let i = start; i <= end; i++) {
            days.push(i);
        }
        return days;
    }

    public static daysOfNextMonth = (date: Date, firstDay: Day): number[] => {
        const remaining = this._daysOfNextMonthCount(date, firstDay);
        let days = [];
        for (let i = 1; i <= remaining; i++) {
            days.push(i);
        }
        return days;
    }

    public static setDate(date: Date, day: number): Date {
        const newDate = new Date(date);
        return new Date(newDate.setDate(day));
    }

    public static prevDate(date: Date): Date {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
    }

    public static nextDate(date: Date): Date {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    public static prevWeek(date: Date): Date {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - this._daysInAWeek);
        return newDate;
    }

    public static nextWeek(date: Date): Date {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + this._daysInAWeek);
        return newDate;
    }

    public static prevMonth(date: Date): Date {
        const newDate = new Date(date);
        const month = newDate.getMonth();
        newDate.setMonth(newDate.getMonth() - 1);
        while (newDate.getMonth() === month) {
            newDate.setDate(newDate.getDate() - 1);
        }
        return newDate;
    }

    public static nextMonth(date: Date): Date {
        const newDate = new Date(date);
        const month = newDate.getMonth();
        newDate.setMonth(newDate.getMonth() + 1);
        while (newDate.getMonth() === month) {
            newDate.setDate(newDate.getDate() + 1);
        }
        return newDate;
    }

    public static prevYear(date: Date): Date {
        const newDate = new Date(date)
        newDate.setFullYear(newDate.getFullYear() - 1);
        return newDate;
    }

    public static nextYear(date: Date): Date {
        const newDate = new Date(date)
        newDate.setFullYear(newDate.getFullYear() + 1);
        return newDate;
    }

    private static _localToUTC(date: Date): Date {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    }

    private static _utcToLocal(date: Date): Date {
        const utcDateString = date.toISOString();
        const localDate = new Date(`${utcDateString}Z`);
        return localDate;
    }

    private static _shiftArrayBackward(array: Array<any>, amount: number) {
        return array.slice(amount).concat(array.slice(0, amount))
    }

    private static _shiftArrayForward(array: Array<any>, amount: number) {
        return array.slice(array.length - amount).concat(array.slice(0, array.length - amount));
    }

    private static _splitDaysIntoWeeks(array: Array<ICalendarDay>) {
        const newArray = [...array];
        const result = [];
        for (let i = 0; i < newArray.length; i += 7) {
            const chunk = array.slice(i, i + 7);
            result.push(chunk);
        }
        return result;
    }

    private static _prefixArray(firstDay: Day): number[] {
        const array = [...Array(this._daysInAWeek).keys()];
        return this._shiftArrayForward(array, firstDay);
    }

    private static _suffixArray(firstDay: Day): number[] {
        const array = [...Array(this._daysInAWeek).keys()];
        return this._shiftArrayBackward(array, firstDay);
    }

    private static _daysOfprevMonthCount(date: Date, firstDay: number): number {
        return this._prefixArray(firstDay)[this._startOfMonth(date).getDay()];
    }

    private static _daysOfNextMonthCount(date: Date, firstDay: number): number {
        return this._suffixArray(firstDay)[6 - this._endOfMonth(date).getDay()];
    }

    private static _startOfMonth(date: Date): Date {
        const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
        return newDate;
    }

    private static _endOfMonth(date: Date): Date {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return newDate;
    }

    private static _daysOfMonthCount(date: Date): number {
        const msPerDay = 1000 * 60 * 60 * 24;
        const start = this._localToUTC(this._startOfMonth(date));
        const end = this._localToUTC(this._endOfMonth(date));

        return Math.floor((end.getTime() - start.getTime()) / msPerDay) + 1;
    }
}