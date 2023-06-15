import { ICalendarCellProps } from "./interfaces/ICalendarCellProps";
import "./style/calendar-cell.css";

const CalendarCell = (props: ICalendarCellProps) => {
    const className = `${props.className || ""} cui-calendar-cell`;

    return (
        <div className={className}>
            <div className="cui-calendar-cell__content">
                {props.children}
            </div>
        </div>
    )
}

export default CalendarCell;