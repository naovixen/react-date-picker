import React, { Component, RefObject } from "react";
import { ICalendarButtonProps } from "./interfaces/ICalendarButtonProps";
import "./style/calendar-button.css";

export class CalendarButton extends Component<ICalendarButtonProps> {
    private readonly _buttonRef: RefObject<HTMLButtonElement> = React.createRef<HTMLButtonElement>();

    public componentDidMount(): void {
        const button = this._buttonRef.current;

        if (this.props.focus && button !== null) {
            button.focus();
        }
    }

    public componentDidUpdate(prevProps: Readonly<ICalendarButtonProps>): void {
        const button = this._buttonRef.current;

        if (prevProps.focus !== this.props.focus && this.props.focus && button !== null) {
            button.focus();
        }
    }

    public render(): JSX.Element {
        return (
            <button
                ref={this._buttonRef}
                className={`cui-calendar-button ${this.props.className} ${this.props.active ? "cui-calendar-button--active" : ""}`}
                onClick={this.props.onClick}
                tabIndex={this.props.active ? 0 : -1}>
                {this.props.children}
            </button>
        );
    }
}
