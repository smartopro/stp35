// libs
import React from "react";
import { Link, NavLink } from "react-router-dom";

// components
import SVGUse from "../svg-use/svg-use";
import data from "../../assets/data";
import Branding from "../branding/branding";

// styles
import styles from "./footer.module.scss";
import CSSModules from "react-css-modules";

const Footer: React.FC = () => (
    <>
        <div styleName="footer">
        <span styleName="footer__logo">
            <Link to="/">
                <SVGUse symbolId="logo" styleName="footer__svg" />
            </Link>
        </span>
            <ul styleName="footer__menu">
                {
                    data.menuItems.map(item => (
                        <li key={item.label}>
                            <NavLink
                                exact={true}
                                styleName="footer__menu-item"
                                to={item.href}
                                activeClassName={styles["footer__menu-item_active"]}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <div styleName="footer__info">
                <ul>
                    <li><div>{data.contact.workingTime}</div></li>
                    <li><a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a></li>
                    <li><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></li>
                    <li><div dangerouslySetInnerHTML={{ __html: data.contact.address }} /></li>
                </ul>
            </div>
            <div styleName="footer__disp">
                <div styleName="footer__pill" className="bg-pill">
                    <span>24<br/>часа</span>
                </div>
                <div styleName="footer__disp-text">Диспетчерская</div>
                <a styleName="footer__phone" href={`tel:${data.contact.phoneDisp}`}>{data.contact.phoneDisp}</a>
            </div>
        </div>
        <div styleName="branding-wrapper">
            <div styleName="branding-wrapper__copyright">
                ООО "САНТЕХПРОМ", { new Date().getFullYear() }
                <small>Copyright © 2016 - { new Date().getFullYear() }. Все права защищены.</small>
            </div>
            <div styleName="branding-wrapper__smarto">
                <Branding UTMSource={`${process.env.DOMAIN}`} styleName="branding" />
            </div>
        </div>
    </>
)

export default CSSModules(Footer, styles, {handleNotFoundStyleName: "log"});
