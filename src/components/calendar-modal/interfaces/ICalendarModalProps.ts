import { Day } from "../../../enums/Day";

export interface ICalendarModalProps {
    onConfirm: (date: Date) => void;
    onClose: () => void;
    firstDayOfWeek: Day;
}