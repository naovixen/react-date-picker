import CalendarButtonCell from "./CalendarButtonCell.component";
import CalendarCell from "./CalendarCell.component";
import { ICalendarHeaderProps } from "./interfaces/ICalendarHeaderProps";
import "./style/calendar-header.css";
import { DateHelper2 } from "../../services/DateHelper2";

const CalendarHeader = (props: ICalendarHeaderProps) => {

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
        <>
            <CalendarButtonCell className="cui-calendar-header__button cui-calendar-header__button--left" onClick={onPrevYear}>{"<<"}</CalendarButtonCell>
            <CalendarButtonCell className="cui-calendar-header__button cui-calendar-header__button--left" onClick={onPrevMonth}>{"<"}</CalendarButtonCell>
            <CalendarCell className="cui-calendar-header__date">
                <span aria-live="polite">
                    {new Intl.DateTimeFormat(undefined, options).format(props.date)}
                </span>
            </CalendarCell>
            <CalendarButtonCell className="cui-calendar-header__button cui-calendar-header__button--right" onClick={onNextMonth}>{">"}</CalendarButtonCell>
            <CalendarButtonCell className="cui-calendar-header__button cui-calendar-header__button--right" onClick={onNextYear}>{">>"}</CalendarButtonCell>
        </>

    )
}

export default CalendarHeader;