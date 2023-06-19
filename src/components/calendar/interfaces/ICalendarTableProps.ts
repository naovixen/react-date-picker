import { Days } from "../../../enums/Days";

export interface ICalendarTableProps {
    date: Date;
    focusDate: boolean;
    firstDayOfWeek: Days;
    onChange: (date: Date) => void;
    onConfirm?: (date: Date) => void;
    onConfirmAndClose?: (date: Date) => void;
}