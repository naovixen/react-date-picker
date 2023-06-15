import { Component, PropsWithChildren } from "react";
import { IDateContext } from "./interfaces/IDateContext";
import { dateContext } from "./DateContext.context";

class DateProvider extends Component<PropsWithChildren, IDateContext> {
    private setDate;

    constructor(props: PropsWithChildren) {
        super(props)

        this.setDate = (date: Date) => {
            this.setState({
                date: date
            });
        }

        this.state = {
            date: new Date(),
            setDate: this.setDate
        }
    }

    render() {
        return (
            <dateContext.Provider value={this.state}>{this.props.children}</dateContext.Provider>
        )
    }
}

export default DateProvider;