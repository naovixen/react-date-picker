import React, { Component } from "react";
import { ICalendarButtonsProps } from "./interfaces/ICalendarButtonProps";
import "./style/calendar-button.css";

class CalendarButton extends Component<ICalendarButtonsProps> {
    private _ref = React.createRef<HTMLButtonElement>();

    constructor(props: ICalendarButtonsProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.focus) {
            this._ref.current?.focus();
        }
    }

    componentDidUpdate(): void {
        if (this.props.focus) {
            this._ref.current?.focus();
        }
    }

    render() {
        const propClass = this.props.className !== undefined ? this.props.className : "";
        const activeClass = this.props.active ? "cui-calendar-button--active" : "";
        const tabIndex = this.props.active ? 0 : -1;

        return (
            <button
                ref={this._ref}
                className={`cui-calendar-button ${propClass} ${activeClass}`}
                onClick={this.props.onClick}
                tabIndex={tabIndex}>
                {this.props.children}
            </button>
        );
    }
}

export default CalendarButton;