import { createContext } from "react";
import { IDateContext } from "./interfaces/IDateContext";

const defaultContextObject: IDateContext = {
    date: new Date(),
    setDate: () => { } // Replace with noop
};

export const dateContext = createContext<IDateContext>(defaultContextObject);

