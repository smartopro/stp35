import React from "react";

const Loader = () => (
    <div className="dot-loader">
        <svg className="dot-loader__filter">
            <defs>
                <filter id="gooeyness">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                                   result="gooeyness"/>
                    <feComposite in="SourceGraphic" in2="gooeyness" operator="atop"/>
                </filter>
            </defs>
        </svg>
        <div className="dot-loader__dots">
            <div className="dot-loader__dot" />
            <div className="dot-loader__dot" />
            <div className="dot-loader__dot" />
            <div className="dot-loader__dot" />
            <div className="dot-loader__dot" />
        </div>
    </div>
)

export default Loader;
