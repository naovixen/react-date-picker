import React, { Component } from "react";
import Calendarheader from "./CalendarHeader.component";
import CalendarTable from "./CalendarTable.component";
import { Day } from "../../enums/Day";
import { ICalendarModalProps } from "./interfaces/ICalendarModalProps";
import { ICalendarModalState } from "./interfaces/ICalendarModalState";
import "./style/calendar-modal.css";

class CalendarModal extends Component<ICalendarModalProps, ICalendarModalState> {
    private _previousActiveElement: HTMLElement | null;
    private _modalRef: React.RefObject<HTMLDivElement>;

    constructor(props: ICalendarModalProps) {
        super(props);

        this.state = {
            date: new Date(),
            shouldFocusDate: true
        }

        this._previousActiveElement = null;
        this._modalRef = React.createRef();
    }

    public componentDidMount(): void {
        this._previousActiveElement = document.activeElement as HTMLElement;
        document.addEventListener("keydown", this._handleKeyDown)
    }

    public componentWillUnmount(): void {
        this._previousActiveElement?.focus();
        document.removeEventListener("keydown", this._handleKeyDown)
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
        const firstDayOfWeek = this.props.firstDayOfWeek || Day.Monday;

        return (
            <div ref={this._modalRef} className="cui-calendar-modal">
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
            </div>
        )
    }

    private _handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            this._previousActiveElement?.focus();
            this.props.onClose();
            return;
        }

        if (event.key === 'Tab') {
            const modal = this._modalRef.current;

            if (modal === null) {
                return;
            }

            const focusableContent = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstFocusableElement = focusableContent[0] as HTMLElement;
            const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

            if (event.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    event.preventDefault();
                }
            }
        }
    }
}

export default CalendarModal