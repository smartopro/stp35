import React from "react";

interface IProps {
    symbolId: string,
    className?: string,
    viewBox?: string,
    style?: object
}

const SVGUse: React.FC<IProps> = (
    { className, viewBox, symbolId, style }
) => (
    <svg className={className} viewBox={viewBox} style={style}>
        <use href={ "#" + symbolId } />
    </svg>
);

export default SVGUse;
