import React from "react";

// CSS
import CSSModules from "react-css-modules";
import styles from "./button.module.scss";
import cn from "classnames";

interface IProps {
    className?: string,
    onClick?: React.MouseEventHandler,
    disabled?: boolean | null,
    styles?: Record<string, string>
}

const Button: React.FC<IProps> = (
    {
        children,
        className,
        onClick,
        disabled = false
    }
) => {
    const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = event => {
        event.preventDefault();
        onClick && onClick(event);
    };

    return (
        <a
            className={className}
            styleName={cn("button", { button_disabled: disabled })}
            onClick={onClickHandler}
            href="#"
        >
            {children}
        </a>
    )
}
export default CSSModules(Button, styles, { allowMultiple: true });
