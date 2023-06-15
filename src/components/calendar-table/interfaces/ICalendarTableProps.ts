import { Day } from "../../../enums/Day";

export interface ICalendarTableProps {
    date: Date;
    firstDayOfWeek?: Day;
    onChange: (value: Date) => void;
    onConfirm: (value: Date) => void;
    onConfirmAndClose: (value: Date) => void;
}