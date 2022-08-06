import React from "react";

interface IProps {
    path: string,
    className?: string
}

const SVGImage: React.FC<IProps> = ({path, className}) => (
    <object
        className={className}
        type="image/svg+xml"
        data={path}
    />
)

export default SVGImage;
