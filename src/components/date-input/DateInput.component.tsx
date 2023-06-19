import { IDateInputProps } from "./interfaces/IDateInputProps";
import "./style/date-input.css";

export const DateInput = (props: IDateInputProps) => {
    return (
        <div>
            <input placeholder="dd" type="text" inputMode="numeric" />
            <input placeholder="mm" type="text" inputMode="numeric" />
            <input placeholder="yyyy" type="text" inputMode="numeric" />
        </div>
    )
}
