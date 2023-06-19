import React from "react";
import { DateHelper } from "../../services/DateHelper";
import { ICalendarHeaderProps } from "./interfaces/ICalendarHeaderProps";
import "./style/calendar-header.css";

export const Calendarheader = (props: ICalendarHeaderProps): JSX.Element => {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short"
    }

    const onPrevYear = (): void => {
        props.onClick(DateHelper.sub(props.date, { years: 1 }));
    }

    const onNextYear = (): void => {
        props.onClick(DateHelper.add(props.date, { years: 1 }));
    }

    const onPrevMonth = (): void => {
        props.onClick(DateHelper.sub(props.date, { months: 1 }));
    }

    const onNextMonth = (): void => {
        props.onClick(DateHelper.add(props.date, { months: 1 }));
    }

    return (
        <div className="cui-calendar-header">
            <button className="cui-calendar-header__button" onClick={onPrevYear}>{"<<"}</button>
            <button className="cui-calendar-header__button" onClick={onPrevMonth}>{"<"}</button>
            <p className="cui-calendar-header__date" aria-live="polite">
                {new Intl.DateTimeFormat(undefined, dateFormatOptions).format(props.date)}
            </p>
            <button className="cui-calendar-header__button" onClick={onNextMonth}>{">"}</button>
            <button className="cui-calendar-header__button" onClick={onNextYear}>{">>"}</button>
        </div>
    );
}
