import React, { Component } from "react";
import { IFocusTrapProps } from "./interfaces/IFocusTrapProps";

class FocusTrap extends Component<IFocusTrapProps> {
    private _ref: React.RefObject<HTMLDivElement>;
    private _previousActiveElement: HTMLElement | null;
    private _firstFocusableElement: HTMLElement | null;
    private _lastFocusableElement: HTMLElement | null;

    constructor(props: IFocusTrapProps) {
        super(props);

        this._ref = React.createRef();
        this._previousActiveElement = null;
        this._firstFocusableElement = null;
        this._lastFocusableElement = null;
    }

    public componentDidMount(): void {
        const modal = this._ref.current;

        if (modal !== null) {
            const focusableContent = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            this._previousActiveElement = document.activeElement as HTMLElement;
            this._firstFocusableElement = focusableContent[0] as HTMLElement;
            this._lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

            this._firstFocusableElement.focus();
            document.addEventListener("keydown", this._handleKeyDown);
            document.addEventListener("mousedown", this._handleMouseDown);
        }
    }

    public componentWillUnmount(): void {
        this._previousActiveElement?.focus();
        document.removeEventListener("keydown", this._handleKeyDown);
        document.removeEventListener("mousedown", this._handleMouseDown);

    }

    public render(): JSX.Element {
        const className = this.props.className !== undefined ? this.props.className : "";

        return (
            <div className={className} ref={this._ref}>
                {this.props.children}
            </div>
        )
    }

    private _handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            this.props.onDeactivate();
        }

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === this._firstFocusableElement) {
                    this._lastFocusableElement?.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === this._lastFocusableElement) {
                    this._firstFocusableElement?.focus();
                    event.preventDefault();
                }
            }
        }
    }

    private _handleMouseDown = (event: MouseEvent) => {
        if (!this.props.clickOutsideDeactivates) {
            return;
        }

        if (this._ref.current === null) {
            return;
        }

        if (!(event.target instanceof Element)) {
            return;
        }

        if (!this._ref.current.contains(event.target)) {
            this.props.onDeactivate();
        }
    }
}

export default FocusTrap