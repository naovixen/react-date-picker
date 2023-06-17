import React, { Component } from "react";
import Calendarheader from "./CalendarHeader.component";
import CalendarTable from "./CalendarTable.component";
import FocusTrap from "../focus-trap/FocusTrap.component";
import { Day } from "../../enums/Day";
import { ICalendarModalProps } from "./interfaces/ICalendarModalProps";
import { ICalendarModalState } from "./interfaces/ICalendarModalState";
import "./style/calendar-modal.css";

class CalendarModal extends Component<ICalendarModalProps, ICalendarModalState> {
    constructor(props: ICalendarModalProps) {
        super(props);

        this.state = {
            date: new Date(),
            shouldFocusDate: true
        }
    }

    public handleClick = (date: Date): void => {
        this.setState({
            date: date,
            shouldFocusDate: false
        });
    }

    public handleChange = (date: Date): void => {
        this.setState({
            date: date,
            shouldFocusDate: true
        });
    }

    public render(): JSX.Element {
        const firstDayOfWeek = this.props.firstDayOfWeek !== undefined ? this.props.firstDayOfWeek : Day.Monday;

        return (
            <FocusTrap className="cui-calendar-modal" clickOutsideDeactivates={true} onDeactivate={this.props.onClose}>
                <Calendarheader date={this.state.date} onClick={this.handleClick} />
                <CalendarTable
                    date={this.state.date}
                    firstDayOfWeek={firstDayOfWeek}
                    focusDate={this.state.shouldFocusDate}
                    onChange={this.handleChange}
                    onConfirm={this.props.onConfirm}
                    onConfirmAndClose={this.props.onConfirmAndClose}
                />

                <div className="cui-calendar-modal__buttons">
                    <button className="cui-calendar-modal__button" onClick={this.props.onClose}>Cancel</button>
                    <button className="cui-calendar-modal__button--accent" onClick={() => this.props.onConfirmAndClose(this.state.date)}>Confirm</button>
                </div>
            </FocusTrap>
        )
    }
}

export default CalendarModal