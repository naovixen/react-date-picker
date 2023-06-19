import React, { Component } from "react";
import { DateHelper } from "../../services/DateHelper";
import { CalendarButton } from "./CalendarButton.component";
import { ICalendarTableProps } from "./interfaces/ICalendarTableProps";
import "./style/calendar-table.css";

export class CalendarTable extends Component<ICalendarTableProps> {
    public readonly handleKeyDown: (event: KeyboardEvent) => void;
    private readonly _reference: React.RefObject<HTMLTableSectionElement>;

    constructor(props: ICalendarTableProps) {
        super(props);

        this._reference = React.createRef();
        this.handleKeyDown = this._handleKeyDown.bind(this);
    }

    public componentDidMount(): void {
        const table = this._reference.current;

        if (table !== null) {
            table.addEventListener("keydown", this.handleKeyDown);
        }
    }

    public componentWillUnmount(): void {
        const table = this._reference.current;

        if (table !== null) {
            table.removeEventListener("keydown", this.handleKeyDown);
        }
    }

    public render(): JSX.Element {
        // Use state here
        const days = DateHelper.getDaysOfWeekStrings(this.props.firstDayOfWeek);
        const weeks = DateHelper.getWeeksInMonth(this.props.date, this.props.firstDayOfWeek);

        return (
            <table className="cui-calendar-table">
                <thead>
                    <tr className="cui-calendar-table__row">
                        {days.map((day) => (
                            <th key={day} className="cui-calendar-table__header">{day}</th>
                        ))}
                    </tr>
                </thead>

                <tbody ref={this._reference}>
                    {weeks.map((week, weekIndex) => (
                        <tr key={weekIndex} className="cui-calendar-table__row">
                            {week.map((day, dayIndex) => {
                                const currentMonth = this.props.date.getMonth();
                                const currentDay = this.props.date.getDate();
                                const isActive = day.number === currentDay && day.month === currentMonth;
                                const isFocused = isActive && this.props.focusDate;
                                const className = day.month !== currentMonth ? "cui-calendar-table__data--other" : "";

                                return (
                                    <td key={dayIndex} className="cui-calendar-table__data">
                                        <CalendarButton
                                            className={className}
                                            active={isActive}
                                            focus={isFocused}
                                            onClick={() => this.props.onChange(DateHelper.set(this.props.date, { day: day.number, month: day.month }))}>
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

    private _handleKeyDown(event: KeyboardEvent): void {
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