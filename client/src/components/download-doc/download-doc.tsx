import React from "react";

// styles
import CSSModules from "react-css-modules";
import styles from "./download-doc.module.scss";
import SVGImage from "../svg-image/svg-image";

interface Props {
    className?: string,
    title: string,
    href: string
    size: number,
    icon: string
}

const DownloadDoc: React.FC<Props> = ({className, title, href, size, icon}) => {
    return (
        <a styleName="root" className={className} href={href}>
            <SVGImage styleName="root__icon" path={icon} />
            <div styleName="root__text">
                <div dangerouslySetInnerHTML={{ __html: title }} />
                <div>{`${size.toString()} Кб`}</div>
            </div>
        </a>
    )
}

export default CSSModules(DownloadDoc, styles, {
    allowMultiple: true
});
