import React from "react";
import parse from "html-react-parser";
import {Element} from "domhandler";

interface IProps {
    svg: string,
    className?: string
}

const SVGInlineImage: React.FC<IProps> = ({svg, className}) => (
    parse(svg, {
        replace: (domNode: Element) => {
            if (domNode.name === "svg" && className) domNode.attribs.className = className;
            return domNode;
        }
    }) as JSX.Element
)

export default SVGInlineImage;
