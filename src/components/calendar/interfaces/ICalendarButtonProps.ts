import React from "react";

export interface ICalendarButtonsProps extends React.PropsWithChildren {
    className?: string;
    focus: boolean;
    active: boolean;
    onClick: () => void;
}
