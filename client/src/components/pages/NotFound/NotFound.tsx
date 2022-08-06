import React from "react";
import {Link} from "react-router-dom";

import SVGImage from "../../svg-image/svg-image";
import SVGUse from "../../svg-use/svg-use";

// styles
import CSSModules from "react-css-modules";
import styles from "./NotFound.module.scss";

import data from "../../../assets/data";

const NotFound: React.FC = () => (
    <div styleName="root">
        <div styleName="wrapper">
            <div styleName="cloud">
                <SVGImage styleName="cloud__svg" path={require("images/404/cloud.svg")} />
                <Link to="/" styleName="logo">
                    <SVGUse symbolId="logo" styleName="logo__svg" />
                    <div styleName="logo__title">Вологда</div>
                </Link>
                <div styleName="cloud__text">Возможно, вы ошиблись, набирая адрес, или страница удалена.</div>
            </div>
            <div styleName="number">404</div>
            <div styleName="text">
                <div styleName="text__line">Попробуйте повторить позже</div>
                <div styleName="text__line">Если ошибка повторится, напишите <a href={`mailto:${data.contact.email}`} styleName="text__link">нам</a></div>
            </div>
            <Link styleName="arrow" to="/">
                <SVGImage styleName="arrow__svg" path={require("images/404/arrow.svg")} />
                <div styleName="arrow__text">Вернуться на главную</div>
            </Link>
        </div>
    </div>
);

export default CSSModules(NotFound, styles, {
    allowMultiple: true
});
