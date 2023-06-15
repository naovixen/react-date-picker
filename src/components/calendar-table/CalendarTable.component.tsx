import React, { Component } from "react";
import CalendarTableControls from "./CalendarTableControls.component";
import CalendarTableData from "./CalendarTableData.component";
import { Day } from "../../enums/Day";
import { DateHelper2 } from "../../services/DateHelper2";
import { ICalendarTableProps } from "./interfaces/ICalendarTableProps";
import { ICalendarTableState } from "./interfaces/ICalendarTableState";
import { CalendarPosition } from "./enums/CalendarPosition";
import { ICalendarDay } from "./interfaces/ICalendarDay";
import "./style/calendar-table.css";

class CalendarTable extends Component<ICalendarTableProps, ICalendarTableState> {
    private gridRef: React.RefObject<HTMLTableSectionElement>;

    constructor(props: ICalendarTableProps) {
        super(props);

        this.state = {
            shouldFocusDate: false
        }

        this.gridRef = React.createRef();
    }

    public componentDidMount(): void {
        const gridRef = this.gridRef.current;

        if (gridRef !== null) {
            gridRef.addEventListener("keydown", this._handleKeyDown)
        }
    }

    public componentWillUnmount(): void {
        const gridRef = this.gridRef.current;

        if (gridRef !== null) {
            gridRef.removeEventListener("keydown", this._handleKeyDown)
        }
    }

    public handleClickDate = (day: ICalendarDay): void => {
        switch (day.position) {
            case CalendarPosition.Prev:
                this.props.onChange(DateHelper2.setDate(DateHelper2.prevMonth(this.props.date), day.date));
                break;
            case CalendarPosition.Next:
                this.props.onChange(DateHelper2.setDate(DateHelper2.nextMonth(this.props.date), day.date));
                break;
            case CalendarPosition.Current:
                this.props.onChange(DateHelper2.setDate(this.props.date, day.date));
                break;
        }
    }

    public render(): JSX.Element {
        const firstDayOfWeek = this.props.firstDayOfWeek || Day.Sunday;
        const daysOfWeek = DateHelper2.daysOfWeek(firstDayOfWeek);
        const weeks = DateHelper2.CalendarWeeks(this.props.date, firstDayOfWeek);

        return (
            <div className="cui-calendar-table">
                <CalendarTableControls date={this.props.date} onChange={this.props.onChange} />

                <table className="cui-calendar-table__table">
                    <thead>
                        <tr className="cui-calendar-table__table-row">
                            {daysOfWeek.map((date, index) => {
                                return (
                                    <th key={index} className="cui-calendar-table__table-header">{date}</th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody ref={this.gridRef}>
                        {weeks.map((week, index) => {
                            return (
                                <tr key={index} className="cui-calendar-table__table-row">
                                    {week.map((day, index) => {
                                        const isActive = day.date === this.props.date.getDate() && day.position === CalendarPosition.Current;
                                        const className = day.position !== CalendarPosition.Current ? "cui-calendar-table__table-data--other" : undefined;

                                        return (
                                            <CalendarTableData
                                                key={index}
                                                className={className}
                                                active={isActive}
                                                focus={isActive}
                                                date={day.date}
                                                onClick={() => this.handleClickDate(day)}
                                            />
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    private _handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            this.props.onChange(DateHelper2.prevWeek(this.props.date));
        }

        if (event.key === "ArrowDown") {
            this.props.onChange(DateHelper2.nextWeek(this.props.date));
        }

        if (event.key === "ArrowLeft") {
            this.props.onChange(DateHelper2.prevDate(this.props.date));
        }

        if (event.key === "ArrowRight") {
            this.props.onChange(DateHelper2.nextDate(this.props.date));
        }

        if (event.key === " ") {
            this.props.onConfirm(this.props.date);
        }

        if (event.key === "Enter") {
            this.props.onConfirmAndClose(this.props.date);
        }
    }
}

export default CalendarTable;