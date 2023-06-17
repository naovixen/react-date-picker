import { Day } from "../../../enums/Day";

export interface ICalendarTableProps {
    date: Date;
    focusDate: boolean;
    firstDayOfWeek: Day;
    onChange: (date: Date) => void;
    onConfirm?: (date: Date) => void;
    onConfirmAndClose?: (date: Date) => void;
}