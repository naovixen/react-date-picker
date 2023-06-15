import { Component, createRef } from "react";
import CalendarCell from "./CalendarCell.component";
import { ICalendarButtonCellProps } from "./interfaces/ICalendarButtonCellProps";
import "./style/calendar-button-cell.css";

class CalendarButtonCell extends Component<ICalendarButtonCellProps> {
    private ref = createRef<HTMLButtonElement>()

    render() {
        const className = `${this.props.className || ""} cui-calendar-button-cell ${this.props.isActive ? "cui-calendar-button-cell--active" : ""}`;
        if (this.props.isFocused) {
            this.ref.current?.focus();
        }

        return (
            <button ref={this.ref} onClick={this.props.onClick} className={className}>
                <CalendarCell>
                    {this.props.children}
                </CalendarCell>
            </button>
        )
    }


}

export default CalendarButtonCell;