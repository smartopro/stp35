import React, { Fragment } from "react";

import styles from "./breadcrumbs.module.scss";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

interface IPath {
    label: string,
    href: string
}

interface IProps {
    path?: IPath[],
    currentPageTitle: string
}

const Breadcrumbs: React.FC<IProps> = ({path, currentPageTitle}) => {
    return (
        <div styleName="breadcrumbs">
            {
                [{ label: "Главная", href: "/" }].concat(path ?? []).map((item) => (
                    <Fragment key={item.href}>
                        <Link styleName="breadcrumbs__item" to={ item.href }>{ item.label }</Link>
                        <div styleName="arrow">
                            <div styleName="arrow__line" />
                            <div styleName="arrow__end" />
                        </div>
                    </Fragment>
                ))
            }
            <span styleName="breadcrumbs__item breadcrumbs__item_last">{currentPageTitle}</span>
        </div>
    )
}

export default CSSModules(Breadcrumbs, styles, {
    allowMultiple: true
});
