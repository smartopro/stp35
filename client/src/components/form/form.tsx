import React, {useState} from "react";

// Components
import InputField from "../input-field/input-field";
import Button from "../button/button";

// Utils
import {IServerError, IServerResponse, isServerResponse, request} from "../../assets/utils";

// CSS
import styles from "./form.module.scss";
import CSSModules from "react-css-modules";
import cn from "classnames";

interface IProps {
    className?: string,
    header?: string,
    subHeader?: string,
    isName?: boolean,
    isPhone?: boolean,
    isTextArea?: boolean,
    button: string,
    styles?: Record<string, string>
}

function hasErrorsByParam(param: string, errors?: IServerError[]) {
    return errors === undefined ? false : errors.filter(err => err.param === param).length >= 1;
}

const Form: React.FC<IProps> = ({
    className,
    header = "",
    subHeader = "",
    isName = true,
    isPhone = true,
    isTextArea = false,
    button = "Бесплатная консультация",
    styles
}) => {
    const [name, setName] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [fetchResult, setFetchResult] = useState<IServerResponse | null>(null);

    const onClickHandler: React.MouseEventHandler = async (e) => {
        e.preventDefault();

        try {
            setFetchResult({ message: "Отправка …" });
            const result = await request("/api/mail/send", "POST", { name, phone, message });
            setFetchResult({ message: result.message });
        } catch (e: unknown) {
            if (isServerResponse(e) && e.errors !== undefined) {
                setFetchResult({
                    errors: e.errors,
                    message: e.errors[0]?.msg ?? "Ошибка"
                });
            }
        }
    }

    return (
        <div styleName="form" className={cn(className, styles?.form)}>
            { header && <h3 styleName="form__header" dangerouslySetInnerHTML={{__html: header}} /> }
            { subHeader && <div styleName="form__subheader" dangerouslySetInnerHTML={{ __html: subHeader }} /> }
            { isName && <InputField
                styleName={ cn("form__input", { "form__input_error": hasErrorsByParam("name", fetchResult?.errors) }) }
                styles={styles}
                placeholder="Имя"
                onChange={ (n: string) => setName(n) }
            />}
            { isPhone && <InputField
                styleName={ cn("form__input", { "form__input_error": hasErrorsByParam("phone", fetchResult?.errors) }) }
                styles={styles}
                isPhone={true}
                onChange={ (p: string) => setPhone(p) }
            /> }
            { isTextArea && <textarea
                className={styles?.["form__text-area"]}
                styleName= "form__text-area"
                placeholder="Сообщение или вопрос"
                onChange={ (e) => setMessage(e.target.value) }
            /> }
            <Button
                className={styles?.form__button}
                styleName="form__button"
                styles={styles}
                onClick={onClickHandler}
                disabled={ fetchResult && (!fetchResult.errors || fetchResult.errors.length === 0) }
            >
                { fetchResult ? fetchResult.message : button }
            </Button>
            <div styleName="form__warning">{`Нажимая на кнопку «${button}», вы соглашаетесь с политикой конфиденциальности`}</div>
        </div>
    );
};

export default CSSModules(Form, styles, {
    allowMultiple: true
});
