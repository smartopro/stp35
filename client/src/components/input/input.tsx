import React from "react";

// CSS
import CSSModules from "react-css-modules";
import styles from "./input.module.scss";

interface IProps {
    className?: string,
    value: string,
    setValue: (value: string | ((val: string) => string)) => void,
    image: string,
    placeholder: string
}

const Input = ({className, value, setValue, image, placeholder}: IProps) => {
    return (
        <div styleName="root" className={className}>
            <input
                type="input"
                styleName="input"
                value={value}
                onChange={event => setValue(event.target.value)}
                placeholder={placeholder}
                spellCheck="false"
                autoComplete="false"
            />
            {
                image && <img styleName="image" src={image} alt="find" />
            }
        </div>
    );
};

export default CSSModules(Input, styles, {
    allowMultiple: true
});
