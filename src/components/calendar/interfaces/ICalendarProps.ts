import { Day } from "../../../enums/Day";

export interface ICalendarProps {
    date: Date;
    firstDayOfWeek?: Day;
    onChange: (value: Date) => void;
}