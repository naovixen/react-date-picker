import CalendarButtonCell from "./CalendarButtonCell.component";
import CalendarCell from "./CalendarCell.component";
import CalendarHeader from "./CalendarHeader.component";
import { Day } from "../../enums/Day";
import { DateHelper2 } from "../../services/DateHelper2";
import { Component } from "react";
import { ICalendarProps } from "./interfaces/ICalendarProps";
import { ICalendarState } from "./interfaces/ICalendarState";
import "./style/calendar.css";


class Calendar extends Component<ICalendarProps, ICalendarState>{
    constructor(props: ICalendarProps) {
        super(props);

        this.state = {
            shouldFocusDate: false
        }
    }

    componentDidUpdate(prevProps: Readonly<ICalendarProps>): void {
        if (prevProps.date !== this.props.date) {
            this.setState({
                shouldFocusDate: false
            });
        }
    }

    handleClickDate = (date: number): void => {
        this.props.onChange(DateHelper2.setDate(this.props.date, date));
        this.setState({
            shouldFocusDate: false
        });
    }

    handleClickprevMonthDate = (date: number): void => {
        this.props.onChange(DateHelper2.setDate(DateHelper2.prevMonth(this.props.date), date));
        this.setState({
            shouldFocusDate: true
        });
    }

    handleClickNextMonthDate = (date: number): void => {
        this.props.onChange(DateHelper2.setDate(DateHelper2.nextMonth(this.props.date), date));
        this.setState({
            shouldFocusDate: true
        });
    }

    handleOnChange = (date: Date) => {
        this.props.onChange(date);
        this.setState({
            shouldFocusDate: false
        });
    }

    render() {
        const firstDayOfWeek = this.props.firstDayOfWeek || Day.Sunday;
        const daysOfWeek = DateHelper2.daysOfWeek(firstDayOfWeek);
        const daysOfMonth = DateHelper2.daysOfMonth(this.props.date);
        const daysOfprevMonth = DateHelper2.daysOfPrevMonth(this.props.date, firstDayOfWeek);
        const daysOfNextMonth = DateHelper2.daysOfNextMonth(this.props.date, firstDayOfWeek);

        return (
            <div className="cui-calendar">
                <CalendarHeader date={this.props.date} onChange={this.handleOnChange} />

                {daysOfWeek.map((date) => {
                    return <CalendarCell className="cui-calendar__days-of-week" key={date}>{date}</CalendarCell>
                })}

                {daysOfprevMonth.map((date) => {
                    return (
                        <CalendarButtonCell
                            className="cui-calendar__other-days-of-month"
                            onClick={() => this.handleClickprevMonthDate(date)}
                            key={date}>
                            {date}
                        </CalendarButtonCell>
                    );
                })}

                {daysOfMonth.map((date) => {
                    const isCurrentDate = date === this.props.date.getDate();
                    const isFocused = isCurrentDate && this.state.shouldFocusDate;

                    return (
                        <CalendarButtonCell
                            isFocused={isFocused}
                            isActive={isCurrentDate}
                            onClick={() => this.handleClickDate(date)}
                            key={date}>
                            {date}
                        </CalendarButtonCell>
                    );
                })}

                {daysOfNextMonth.map((date) => {
                    return (
                        <CalendarButtonCell
                            className="cui-calendar__other-days-of-month"
                            onClick={() => this.handleClickNextMonthDate(date)}
                            key={date}>
                            {date}
                        </CalendarButtonCell>
                    );
                })}
            </div>
        )
    }
}

export default Calendar;