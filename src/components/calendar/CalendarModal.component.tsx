import React, { Component } from "react";
import { Days } from "../../enums/Days";
import { Calendarheader } from "./CalendarHeader.component";
import { CalendarTable } from "./CalendarTable.component";
import { FocusTrap } from "../focus-trap/FocusTrap.component";
import { ICalendarModalProps } from "./interfaces/ICalendarModalProps";
import { ICalendarModalState } from "./interfaces/ICalendarModalState";
import "./style/calendar-modal.css";

export class CalendarModal extends Component<ICalendarModalProps, ICalendarModalState> {
    public readonly handleClick: (date: Date) => void;
    public readonly handleChange: (date: Date) => void;

    constructor(props: ICalendarModalProps) {
        super(props);

        this.handleClick = this._handleClick.bind(this);
        this.handleChange = this._handleChange.bind(this);

        this.state = {
            date: new Date(),
            shouldFocusDate: true
        };
    }

    public render(): JSX.Element {
        const firstDayOfWeek = this.props.firstDayOfWeek !== undefined ? this.props.firstDayOfWeek : Days.Monday;

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
        );
    }

    private _handleClick(date: Date): void {
        this.setState({
            date: date,
            shouldFocusDate: false
        });
    }

    private _handleChange(date: Date): void {
        this.setState({
            date: date,
            shouldFocusDate: true
        });
    }
}
