import React, { Component } from "react";
import { IFocusTrapProps } from "./interfaces/IFocusTrapProps";

export class FocusTrap extends Component<IFocusTrapProps> {
    public readonly handleKeyDown: (event: KeyboardEvent) => void;
    public readonly handleMouseDown: (event: MouseEvent) => void;
    private readonly _reference: React.RefObject<HTMLDivElement>;
    private readonly _previousActiveElement: HTMLElement;
    private _firstFocusableElement: HTMLElement | null;
    private _lastFocusableElement: HTMLElement | null;

    constructor(props: IFocusTrapProps) {
        super(props);

        this.handleKeyDown = this._handleKeyDown.bind(this);
        this.handleMouseDown = this._handleMouseDown.bind(this);
        this._reference = React.createRef();
        this._previousActiveElement = document.activeElement as HTMLElement;
        this._firstFocusableElement = null;
        this._lastFocusableElement = null;
    }

    public componentDidMount(): void {
        const focusContainer = this._reference.current;

        if (focusContainer !== null) {
            const focusableContent = focusContainer.querySelectorAll(
                "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
            );

            this._firstFocusableElement = focusableContent[0] as HTMLElement;
            this._lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

            this._firstFocusableElement.focus();
            document.body.addEventListener("keydown", this.handleKeyDown);
            document.body.addEventListener("mousedown", this.handleMouseDown);
        }
    }

    public componentWillUnmount(): void {
        this._previousActiveElement.focus();
        document.body.removeEventListener("keydown", this.handleKeyDown);
        document.body.removeEventListener("mousedown", this.handleMouseDown);
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.className} ref={this._reference}>
                {this.props.children}
            </div>
        );
    }

    private _handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            this.props.onDeactivate();
        }

        if (event.key === "Tab") {
            const isFirstElementActive = document.activeElement === this._firstFocusableElement;
            const isLastElementActive = document.activeElement === this._lastFocusableElement;

            if (event.shiftKey) {
                if (isFirstElementActive && this._lastFocusableElement !== null) {
                    this._lastFocusableElement.focus();
                    event.preventDefault();
                }
            } else if (isLastElementActive && this._firstFocusableElement !== null) {
                this._firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }

    private _handleMouseDown(event: MouseEvent): void {
        if (this._reference.current === null || !(event.target instanceof Element)) {
            return;
        }

        const isTargetOutsideElement = !this._reference.current.contains(event.target);
        const isTargetPreviousActiveElement = this._previousActiveElement.contains(event.target);

        if (this.props.clickOutsideDeactivates && isTargetOutsideElement && !isTargetPreviousActiveElement) {
            this.props.onDeactivate();
        }
    }
}
