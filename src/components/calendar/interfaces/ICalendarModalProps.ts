import { Days } from "../../../enums/Days";

export interface ICalendarModalProps {
    onConfirm: (date: Date) => void;
    onConfirmAndClose: (date: Date) => void;
    onClose: () => void;
    firstDayOfWeek: Days;
}