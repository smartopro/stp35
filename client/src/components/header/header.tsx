import React, {useState} from "react";
import {NavLink, Link} from "react-router-dom";

import data from "../../assets/data";
import {phoneToTel} from "../../assets/utils";

import SVGUse from "../svg-use/svg-use";
import SVGImage from "../svg-image/svg-image";

// styles
import CSSModules from "react-css-modules";
import styles from "./header.module.scss";
import cn from "classnames";

const Menu: React.FC = CSSModules(() => {
    const [isHamburgerOpen, setHamburgerOpen] = useState(false);

    return (<div styleName="menu__wrapper">
        <ul styleName={cn("menu", {menu_open: isHamburgerOpen})}>
            {
                data.menuItems.map(item =>
                    <li key={item.href} styleName="menu__item">
                        <NavLink
                            exact={true}
                            styleName="menu__link"
                            to={item.href}
                            activeClassName={styles.menu__link_active}
                            onClick={() => setHamburgerOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    </li>)
            }
        </ul>
        <div styleName={cn("hamburger", {hamburger_open: isHamburgerOpen})} onClick={() => setHamburgerOpen(state => !state)}>
            <div styleName="hamburger__dash hamburger__dash_top" />
            <div styleName="hamburger__dash hamburger__dash_middle" />
            <div styleName="hamburger__dash hamburger__dash_bottom" />
        </div>
    </div>)
}, styles, {
    allowMultiple: true
})

interface Props {
    className?: string
}

const Header: React.FC<Props> = ({className}) => {
    return (<header styleName="header" className={className}>
        <Link to="/" styleName="logo">
            <SVGUse symbolId="logo" styleName="logo__svg" />
            <div styleName="logo__title">Вологда</div>
        </Link>
        <Menu />
        <div styleName="info">
            <div styleName="info__time">{data.contact.workingTime} Пн-Пт</div>
            <a className="link" styleName="info__email" href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
        </div>
        <div styleName="phone">
            <a styleName="phone__link" href={`tel:${phoneToTel(data.contact.phone)}`}>
                <SVGImage path={require("images/phone.svg")} styleName="phone__svg" />
                <span styleName="phone__number">{data.contact.phone}</span>
            </a>
            <span styleName="phone__title">Работаем круглосуточно и без выходных </span>
        </div>
    </header>)
}

export default CSSModules(Header, styles, {
    allowMultiple: true,
    handleNotFoundStyleName: "log"
});
