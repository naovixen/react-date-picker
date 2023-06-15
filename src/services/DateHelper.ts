const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const shiftArrayBackward = (array: Array<any>, amount: number) => {
    return array.slice(amount).concat(array.slice(0, amount))
}

export const shiftArrayForward = (array: Array<any>, amount: number) => {
    return array.slice(array.length - amount).concat(array.slice(0, array.length - amount));
}

export const toUTC = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);
export const endOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const daysOfMonthCount = (date: Date): number => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    // Need to convert to UTC to ensure that there are no issues with daylight saving time
    return Math.floor((toUTC(end) - toUTC(start)) / msPerDay) + 1;
}

export const getDaysOfMonth = (date: Date): number[] => {
    let days = [];
    for (let i = 1; i <= daysOfMonthCount(date); i++) {
        days.push(i);
    }
    return days;
}

export const prevDay = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    newDate.setDate(newDate.getDate() - 1);
    while (newDate.getDate() === day) {
        newDate.setHours(newDate.getHours() - 1);
    }
    return newDate;
}

export const nextDay = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    newDate.setDate(newDate.getDate() + 1);
    while (newDate.getDate() === day) {
        newDate.setHours(newDate.getHours() + 1);
    }
    return newDate;

}

export const prevWeek = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    newDate.setDate(newDate.getDate() - 7);
    while (newDate.getDate() === day) {
        newDate.setHours(newDate.getHours() - 1);
    }
    return newDate;
}


export const prevMonth = (date: Date): Date => {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    newDate.setMonth(newDate.getMonth() - 1);
    while (newDate.getMonth() === month) {
        newDate.setDate(newDate.getDate() - 1);
    }
    return newDate;
}

export const nextMonth = (date: Date): Date => {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    newDate.setMonth(newDate.getMonth() + 1);
    while (newDate.getMonth() === month) {
        newDate.setDate(newDate.getDate() + 1);
    }
    return newDate;
}

export const prevYear = (date: Date): Date => {
    return new Date(date.setFullYear(date.getFullYear() - 1));
}

export const nextYear = (date: Date): Date => {
    return new Date(date.setFullYear(date.getFullYear() + 1));
}

export const setDate = (date: Date, day: number): Date => {
    return new Date(date.setDate(day));
}

export const prefixArray = (firstDay: number): number[] => {
    const array = [...Array(7).keys()];
    return shiftArrayForward(array, firstDay);
}

export const suffixArray = (firstDay: number): number[] => {
    const array = [...Array(7).keys()];
    return shiftArrayBackward(array, firstDay);
}

export const daysOfprevMonthCount = (date: Date, firstDay: number): number => {
    return prefixArray(firstDay)[startOfMonth(date).getDay()];
}

export const daysOfNextMonthCount = (date: Date, firstDay: number): number => {
    return suffixArray(firstDay)[6 - endOfMonth(date).getDay()];
}

export const getDaysOfprevMonth = (date: Date, firstDay: number): number[] => {
    const remaining = daysOfprevMonthCount(date, firstDay);
    const end = endOfMonth(prevMonth(date)).getDate();
    const start = end - remaining + 1;
    let days = [];
    for (let i = start; i <= end; i++) {
        days.push(i);
    }
    return days;
}

export const getDaysOfNextMonth = (date: Date, firstDay: number): number[] => {
    const remaining = daysOfNextMonthCount(date, firstDay);
    let days = [];
    for (let i = 1; i <= remaining; i++) {
        days.push(i);
    }
    return days;
}

export const getDaysOfWeek = (firstDay: number): string[] => {
    return shiftArrayBackward(daysOfWeek, firstDay);
}


