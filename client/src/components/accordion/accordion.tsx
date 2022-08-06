import React, {useRef, useState} from "react";

import SVGImage from "../svg-image/svg-image";

import CSSModules from "react-css-modules";
import styles from "./accordion.module.scss";
import cn from "classnames";

interface IProps {
    className?: string,
    data: { image: any, title: string, text: string }[],
    propsStyles?: Record<string, string>
}

interface IHeights {
    [key: string]: number
}

const Accordion: React.FC<IProps> = ({className, data, propsStyles}) => {
    const [height, setHeight] = useState<IHeights>({});
    const refRoot = useRef<HTMLDivElement>(null);

    const onHeaderClick = (title: string, idx: number) => {
        setHeight(prevHeight => {
            if (refRoot.current) {
                return {
                    ...prevHeight,
                    [title]: prevHeight[title] ? 0 : refRoot.current.querySelectorAll("[class*=item__text-wrapper]")[idx].scrollHeight
                }
            }
            return prevHeight;
        });
    }

    return (
        <div className={className} styleName="accordion" ref={refRoot}>
            {
                data.map(({image, title, text}, idx) => (
                    <div styleName="item" key={title} className={propsStyles?.item}>
                        <div styleName="image-wrapper" className={cn("bg-pill", propsStyles?.["bg-pill"])}>
                            <SVGImage path={image} styleName="image" />
                        </div>
                        <div
                            className={propsStyles?.item__title}
                            styleName={cn("item__title", { item__title_active: !!height[title] })}
                            onClick={() => onHeaderClick(title, idx)}
                        >
                            {title}
                        </div>
                        <div
                            className={propsStyles?.["item__text-wrapper"]}
                            styleName="item__text-wrapper"
                            style={{ maxHeight: height[title] ?? 0 }}
                        >
                            <div
                                className={propsStyles?.item__text}
                                styleName="item__text"
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default CSSModules(Accordion, styles, {
    handleNotFoundStyleName: "log",
    allowMultiple: true
});
