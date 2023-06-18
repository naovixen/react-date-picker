import React, { Component } from "react";
import { ICalendarButtonsProps } from "./interfaces/ICalendarButtonProps";
import "./style/calendar-button.css";

class CalendarButton extends Component<ICalendarButtonsProps> {
    private ref = React.createRef<HTMLButtonElement>();

    render() {
        const propClass = this.props.className !== undefined ? this.props.className : "";
        const activeClass = this.props.active ? "cui-calendar-button--active" : "";
        const tabIndex = this.props.active ? 0 : -1;

        if (this.props.focus) {
            this.ref.current?.focus();
        }

        return (
            <button
                ref={this.ref}
                className={`cui-calendar-button ${propClass} ${activeClass}`}
                onClick={this.props.onClick}
                tabIndex={tabIndex}>
                {this.props.children}
            </button>
        );
    }
}

export default CalendarButton;