import React from "react";

export interface ICalendarButtonProps extends React.PropsWithChildren {
    className?: string;
    focus: boolean;
    active: boolean;
    onClick: () => void;
}
