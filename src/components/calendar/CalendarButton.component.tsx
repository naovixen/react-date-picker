import React, { Component } from "react";
import { ICalendarButtonsProps } from "./interfaces/ICalendarButtonProps";
import "./style/calendar-button.css";

class CalendarButton extends Component<ICalendarButtonsProps> {
    private _buttonRef = React.createRef<HTMLButtonElement>();

    componentDidMount(): void {
        const button = this._buttonRef.current;

        if (this.props.focus && button !== null) {
            button.focus();
        }
    }

    componentDidUpdate(prevProps: Readonly<ICalendarButtonsProps>): void {
        const button = this._buttonRef.current;

        if (prevProps.focus !== this.props.focus && this.props.focus && button !== null) {
            button.focus();
        }
    }

    render() {
        const propClass = this.props.className !== undefined ? this.props.className : "";
        const activeClass = this.props.active ? "cui-calendar-button--active" : "";
        const tabIndex = this.props.active ? 0 : -1;

        return (
            <button
                ref={this._buttonRef}
                className={`cui-calendar-button ${propClass} ${activeClass}`}
                onClick={this.props.onClick}
                tabIndex={tabIndex}>
                {this.props.children}
            </button>
        );
    }
}

export default CalendarButton;