import React, { Component } from "react";
import CalendarTable from "../calendar-table/CalendarTable.component";
import { ICalendarModalProps } from "./interfaces/ICalendarModalProps";
import { ICalendarModalState } from "./interfaces/ICalendarModalState";
import "./style/calendar-modal.css";

class CalendarModal extends Component<ICalendarModalProps, ICalendarModalState> {
    private _previousActiveElement: HTMLElement | null;
    private _modalRef: React.RefObject<HTMLDivElement>;

    constructor(props: ICalendarModalProps) {
        super(props);

        this.state = {
            date: new Date()
        }

        this._previousActiveElement = document.activeElement as HTMLElement;
        this._modalRef = React.createRef();
    }

    public componentDidMount(): void {
        document.addEventListener("keydown", this._handleKeyDown)
    }

    public componentWillUnmount(): void {
        document.removeEventListener("keydown", this._handleKeyDown)
    }

    public handleChange = (date: Date): void => {
        this.setState({ date: date });
    }

    public handleConfirmAndClose = (): void => {
        this.props.onConfirm(this.state.date);
        this.props.onClose();
    }

    public render(): JSX.Element {
        return (
            <div ref={this._modalRef} className="cui-calendar-modal">
                <CalendarTable
                    date={this.state.date}
                    onChange={this.handleChange}
                    onConfirm={this.props.onConfirm}
                    onConfirmAndClose={this.handleConfirmAndClose}
                    firstDayOfWeek={this.props.firstDayOfWeek} />
                <div className="cui-calendar-modal__buttons">
                    <button className="cui-calendar-modal__button" onClick={this.props.onClose}>Cancel</button>
                    <button className="cui-calendar-modal__button--accent" onClick={this.handleConfirmAndClose}>Confirm</button>
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