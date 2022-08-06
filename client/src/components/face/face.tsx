import React from "react";

import {useStore} from "../../store/store";
import {phoneToTel} from "../../assets/utils";
import Button from "../button/button";

// styles
import CSSModules from "react-css-modules";
import styles from "./face.module.scss";

interface Props {
    image: string,
    header: string,
    text?: string,
    phone: string,
    button: string
}

const Face: React.FC<Props> = ({
    image,
    header,
    text,
    phone,
    button
                               }) => {
    const {popupVisibleToggle} = useStore("appStore");

    return (
        <section className="section section__content face" >
            <img className="face__img" src={image} alt="main photo" />
            <div className="face__wrapper">
                <div className="face__content">
                    <h1 className="face__header">{header}</h1>
                    <div className="face__info">
                        <div
                            className="face__text"
                            dangerouslySetInnerHTML={{ __html: text || "" }}
                        />
                        <a className="face__phone" href={`tel:${phoneToTel(phone)}`}>{phone}</a>
                        <Button className="face__button" onClick={popupVisibleToggle} styles={styles}>{button}</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CSSModules(Face, styles, {
    allowMultiple: true
});
