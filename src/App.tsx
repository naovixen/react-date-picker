import { Component } from "react";
import DateInput from "./components/date-input/DateInput.component";
import { Day } from "./enums/Day";
import CalendarModal from "./components/calendar-modal/CalendarModal.component";


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

    dateChange = (date: Date) => {
        this.setState({
            date: date
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
                <CalendarModal onConfirm={this.dateChange} onClose={() => console.log("cancel")} firstDayOfWeek={Day.Monday} />

                <p>React Date Input</p>
                <DateInput />

            </>
        )
    }


}

export default App
