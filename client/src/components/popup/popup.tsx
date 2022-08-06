import React, {useRef} from "react";

import styles from "./popup.module.scss";
import CSSModules from "react-css-modules";
import cn from "classnames";
import Form from "../form/form";

interface Props {
    className?: string,
    isVisible: boolean,
    toggle: () => void
}

const Popup: React.FC<Props> = ({isVisible, toggle, className}) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    popupRef.current && popupRef.current.focus();

    const onKeyDown: React.KeyboardEventHandler = e => {
        if (e.key === "Escape" && isVisible) toggle();
    }

    const onLayoutClick: React.MouseEventHandler = e => {
        if (e.currentTarget === e.target) toggle();
    }

    return (
        <div
            ref={popupRef}
            styleName={ cn("popup", { popup_visible: isVisible }) }
            { ... className ?? {className} }
            onKeyDown={onKeyDown}
            onClick={onLayoutClick}
            tabIndex={0}
        >
            <div styleName="form">
                <h3 styleName="form__header">Оставьте свой телефон и мы с вами свяжемся</h3>
                <Form button="Оставить заявку" styleName="form__items"  />
                <div styleName="form__close" onClick={toggle}>&#x2715;</div>
            </div>
        </div>
    )
}

export default CSSModules(Popup, styles, {
    handleNotFoundStyleName: "log",
    allowMultiple: true
})
