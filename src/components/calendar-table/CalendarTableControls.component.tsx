import { ICalendarTableControlsProps } from "./interfaces/ICalendarTableControlsProps";
import { DateHelper2 } from "../../services/DateHelper2";
import "./style/calendar-table-controls.css";

const CalendarTableControls = (props: ICalendarTableControlsProps) => {

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short"
    }

    const onPrevYear = (): void => {
        props.onChange(DateHelper2.prevYear(props.date));
    }

    const onNextYear = (): void => {
        props.onChange(DateHelper2.nextYear(props.date));
    }

    const onPrevMonth = (): void => {
        props.onChange(DateHelper2.prevMonth(props.date));
    }

    const onNextMonth = (): void => {
        props.onChange(DateHelper2.nextMonth(props.date));
    }

    return (
        <div className="cui-calendar-table-controls">
            <button className="cui-calendar-table-controls__button" onClick={onPrevYear}>{"<<"}</button>
            <button className="cui-calendar-table-controls__button" onClick={onPrevMonth}>{"<"}</button>
            <p className="cui-calendar-table-controls__month-year" aria-live="polite">
                {new Intl.DateTimeFormat(undefined, options).format(props.date)}
            </p>
            <button className="cui-calendar-table-controls__button" onClick={onNextMonth}>{">"}</button>
            <button className="cui-calendar-table-controls__button" onClick={onNextYear}>{">>"}</button>
        </div>
    )
}

export default CalendarTableControls;