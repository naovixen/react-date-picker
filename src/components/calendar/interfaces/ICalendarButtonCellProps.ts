import { PropsWithChildren } from "react";

export interface ICalendarButtonCellProps extends PropsWithChildren {
    isFocused?: boolean;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}