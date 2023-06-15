import { Component } from "react";
import { ICalendarTableDataProps } from "./interfaces/ICalendarTableDataProps";
import "./style/calendar-table-data.css";
import React from "react";

class CalendarTableData extends Component<ICalendarTableDataProps> {
    private ref = React.createRef<HTMLButtonElement>();

    render() {
        const className = this.props.className !== undefined ? this.props.className : "";
        const activeClass = this.props.active ? "cui-calendar-table-data__button--active" : "";
        const tabIndex = this.props.active ? 0 : -1;

        if (this.props.focus) {
            this.ref.current?.focus();
        }

        return (
            <td className="cui-calendar-table-data">
                <button
                    ref={this.ref}
                    className={`${className} ${activeClass} cui-calendar-table-data__button`}
                    onClick={this.props.onClick}
                    tabIndex={tabIndex}>
                    {this.props.date}
                </button>
            </td>
        )
    }
}

export default CalendarTableData;