import React from "react"

export interface IFocusTrapProps extends React.PropsWithChildren {
    className: string;
    clickOutsideDeactivates: boolean;
    onDeactivate: () => void;
}