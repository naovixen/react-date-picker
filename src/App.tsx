import React, { Component } from "react";
import { DateInput } from "./components/date-input/DateInput.component";
import { CalendarModal } from "./components/calendar/CalendarModal.component";
import { Days } from "./enums/Days";

interface IAppState {
    date: Date;
    showCalendar: Boolean;
}

class App extends Component<{}, IAppState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            date: new Date(),
            showCalendar: false
        }
    }

    public handleConfirm = (date: Date): void => {
        this.setState({
            date: date
        });
    }

    public handleConfirmAndClose = (date: Date): void => {
        this.setState({
            date: date,
            showCalendar: false
        });
    }

    public handleClose = (): void => {
        this.setState({
            showCalendar: false
        });
    }

    public toggleCalendar = (): void => {
        this.setState({
            showCalendar: !this.state.showCalendar
        });
    }

    public render(): JSX.Element {
        const dateFormatOptions: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        }

        return (
            <>
                <p>React Calendar</p>
                <p>Selected Date: {new Intl.DateTimeFormat(undefined, dateFormatOptions).format(this.state.date)}</p>
                <button onClick={this.toggleCalendar}>Show Calendar</button>
                {this.state.showCalendar && (
                    <CalendarModal
                        onConfirm={this.handleConfirm}
                        onConfirmAndClose={this.handleConfirmAndClose}
                        onClose={this.handleClose}
                        firstDayOfWeek={Days.Monday}
                    />
                )}
                <p>React Date Input</p>
            </>
        )
    }
}

export default App
