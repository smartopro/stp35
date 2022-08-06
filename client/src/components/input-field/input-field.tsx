import React, {useState} from "react";
import CSSModules from "react-css-modules";
import NumberFormat from "react-number-format";

// CSS
import s from "./input-field.module.scss";

interface IProps {
    className?: string,
    placeholder?: string,
    isPhone?: boolean,
    onChange?: Function
    styles?: Record<string, string>
}

const InputField: React.FC<IProps> = ({
    className,
    placeholder = "",
    isPhone = false,
    onChange
}) => {
    const [phoneValue, setPhoneValue] = useState("");

    return isPhone ?
        <NumberFormat
            format="+7 (###) ###-##-##"
            allowEmptyFormatting
            mask="_"
            inputMode="tel"
            type="tel"
            className={className}
            styleName="input-field"
            isNumericString={true}
            onValueChange={e => {
                setPhoneValue(e.value);
                onChange && onChange(e.value);
            }}
            style={{color: phoneValue ? "#000" : "#ACACAC", textAlign: "left"}}
        /> :
        <input
            type="text"
            className={className}
            styleName="input-field"
            placeholder={placeholder}
            onChange={e => onChange && onChange(e.target.value)}
        />;
};

export default CSSModules(InputField, s, {
    allowMultiple: true
});
