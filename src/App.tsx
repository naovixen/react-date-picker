import React, { Component } from "react";
import DateInput from "./components/date-input/DateInput.component";
import CalendarModal from "./components/calendar/CalendarModal.component";
import { Day } from "./enums/Day";

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

    handleConfirm = (date: Date) => {
        this.setState({
            date: date
        });
    }

    handleConfirmAndClose = (date: Date) => {
        this.setState({
            date: date,
            showCalendar: false
        });
        console.log("close");
    }

    handleClose = () => {
        this.setState({
            showCalendar: false
        });
    }

    toggleCalendar = () => {
        console.log(this.state.showCalendar)
        this.setState({
            showCalendar: !this.state.showCalendar
        });
    }

    render() {
        const options: Intl.DateTimeFormatOptions = {
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
                <p>Selected Date: {new Intl.DateTimeFormat(undefined, options).format(this.state.date)}</p>
                <button onClick={this.toggleCalendar}>Show Calendar</button>
                {this.state.showCalendar && (
                    <CalendarModal
                        onConfirm={this.handleConfirm}
                        onConfirmAndClose={this.handleConfirmAndClose}
                        onClose={this.handleClose}
                        firstDayOfWeek={Day.Sunday}
                    />
                )}
                <p>React Date Input</p>
            </>
        )
    }
}

export default App
