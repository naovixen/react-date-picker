import React, { Component } from "react";
import DateInput from "./components/date-input/DateInput.component";
import CalendarModal from "./components/calendar/CalendarModal.component";
import { Day } from "./enums/Day";

interface IAppState {
    date: Date
}

class App extends Component<{}, IAppState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            date: new Date()
        }
    }

    handleConfirm = (date: Date) => {
        this.setState({
            date: date
        });
    }

    handleConfirmAndClose = (date: Date) => {
        this.setState({
            date: date
        });
        console.log("close");
    }

    handleClose = () => {
        console.log("close");
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
                <CalendarModal onConfirm={this.handleConfirm} onConfirmAndClose={this.handleConfirmAndClose} onClose={this.handleClose} firstDayOfWeek={Day.Monday} />
                <p>React Date Input</p>
                <DateInput />
            </>
        )
    }
}

export default App
