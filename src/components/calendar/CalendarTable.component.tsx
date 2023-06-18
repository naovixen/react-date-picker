import React, { Component } from "react";
import CalendarButton from "./CalendarButton.component";
import { DateHelper } from "../../services/DateHelper";
import { ICalendarTableProps } from "./interfaces/ICalendarTableProps";
import "./style/calendar-table.css";

class CalendarTable extends Component<ICalendarTableProps> {
    private tableRef: React.RefObject<HTMLTableSectionElement>;

    constructor(props: ICalendarTableProps) {
        super(props);

        this.tableRef = React.createRef();
    }

    public componentDidMount(): void {
        const table = this.tableRef.current;

        if (table !== null) {
            table.addEventListener("keydown", this._handleKeyDown)
        }
    }

    public componentWillUnmount(): void {
        const table = this.tableRef.current;

        if (table !== null) {
            table.removeEventListener("keydown", this._handleKeyDown)
        }
    }

    public render(): JSX.Element {
        const days = DateHelper.getDaysOfWeekStrings(this.props.firstDayOfWeek);
        const weeks = DateHelper.getWeeksInMonth(this.props.date, this.props.firstDayOfWeek);

        return (
            <table className="cui-calendar-table">
                <thead>
                    <tr className="cui-calendar-table__row">
                        {days.map((day, dayIndex) => (
                            <th key={dayIndex} className="cui-calendar-table__header">{day}</th>
                        ))}
                    </tr>
                </thead>

                <tbody ref={this.tableRef}>
                    {weeks.map((week, weekIndex) => (
                        <tr key={weekIndex} className="cui-calendar-table__row">
                            {week.map((day, dayIndex) => {
                                const currentMonth = this.props.date.getMonth();
                                const currentDay = this.props.date.getDate();
                                const isActive = day.number === currentDay && day.month === currentMonth;
                                const isFocused = isActive && this.props.focusDate;
                                const className = day.month !== currentMonth ? "cui-calendar-table__data--other" : undefined;

                                return (
                                    <td key={dayIndex} className="cui-calendar-table__data">
                                        <CalendarButton
                                            key={dayIndex}
                                            className={className}
                                            active={isActive}
                                            focus={isFocused}
                                            onClick={() => this.props.onChange(DateHelper.set(this.props.date, { month: day.month, day: day.number }))}>
                                            {day.number}
                                        </CalendarButton>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    private _handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            this.props.onChange(DateHelper.sub(this.props.date, { weeks: 1 }));
        }

        if (event.key === "ArrowDown") {
            this.props.onChange(DateHelper.add(this.props.date, { weeks: 1 }));
        }

        if (event.key === "ArrowLeft") {
            this.props.onChange(DateHelper.sub(this.props.date, { days: 1 }));
        }

        if (event.key === "ArrowRight") {
            this.props.onChange(DateHelper.add(this.props.date, { days: 1 }));
        }

        if (event.key === " " && this.props.onConfirm !== undefined) {
            this.props.onConfirm(this.props.date);
        }

        if (event.key === "Enter" && this.props.onConfirmAndClose !== undefined) {
            this.props.onConfirmAndClose(this.props.date);
            event.preventDefault();
        }
    }
}

export default CalendarTable;