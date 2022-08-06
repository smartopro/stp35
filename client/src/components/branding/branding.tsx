import React from "react";

// CSS
import CSSModules from "react-css-modules";
import styles from "./branding.module.scss";

interface Props {
    className?: string,
    UTMSource: string
}

const Branding: React.FC<Props> = ({className, UTMSource}) => (
    <div styleName="branding" { ... className && {className} }>
        <span styleName="branding__made-in">Сделано в</span>
        <a styleName="smarto" href={`https://www.smarto.pro?utm_source=${UTMSource}`} target="_blank">
            <svg styleName="smarto__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1981 297">
                <path
                    d="m3.7768 293.68h180.44c19.3 0 37.77-2.07 52.46-20.74 12.17-15.35 14.68-35.67 14.68-53.92 0-13.69-1.67-39.41-19.3-56-8.81-8.3-22.24-14.52-41.96-20.74l-107.43-33.6c-23.501-7.47-27.278-19.912-27.278-32.771 0-5.392 0.42-15.762 7.554-22.399 6.714-6.222 15.527-6.637 23.08-6.637h150.23v-43.555h-169.12c-14.265 0.0004-33.149 2.0744-48.256 16.178-16.786 15.348-18.884 36.503-18.884 53.924 0 16.178 1.6786 38.99 15.107 54.76 11.75 14.1 30.214 20.32 34.83 21.56l115.82 36.09c25.6 7.88 28.53 21.16 28.53 32.77 0 9.96-1.26 31.53-27.69 31.53h-162.82v43.55z"/>
                <path
                    d="m610.23 68.443c1.26-3.319 4.2-9.541 7.13-9.541 1.68 0 5.04 0.83 5.04 8.711l-1.68 226.07h55.4v-255.52c0-26.546-20.15-38.16-47.42-38.16-20.99 0-39.03 4.5628-51.62 37.332l-75.96 193.72c-2.51 6.22-5.45 10.78-7.97 10.78s-5.45-4.56-7.97-10.78l-75.96-193.72c-7.97-20.323-17.62-37.33-51.61-37.33-8.39 0-47.42 0.4148-47.42 38.162v255.52h55.39l-1.26-226.07c0-1.241 0-8.708 4.62-8.708 2.52 0 5.87 6.222 7.13 9.541l75.12 193.72c7.13 18.25 13.85 34.84 41.96 34.84 26.02 0 33.57-12.86 41.97-34.84l75.11-193.72z"/>
                <path
                    d="m1060.9 293.68h55.4v-226.07c0-5.804 0-11.197 5.9-16.174 4.6-4.148 8.8-4.563 14.7-4.563h89.8c8.8 0 22.2 0 31 8.711 5.9 5.807 10.5 17.422 10.5 40.236 0 9.96-0.8 30.7-6.7 39.82-7.5 11.62-20.6 12.86-30.2 12.86h-55.4c-15.9 0-24.8 8.3-24.8 19.91v6.64c0 8.29 8 18.66 13.9 24.47l96.5 94.16h69.7l-111.7-102.46v-2.07h37.8c33.6 0 47.9-15.76 55.4-29.87 11.7-21.56 12.6-44.38 12.6-65.534 0-21.155-0.9-43.97-14.7-63.88-17.2-25.303-42.4-26.548-62.9-26.548h-139.4c-10.9 0.0004-24.7 1.6596-35.2 11.615-11.8 11.2-12.2 25.718-12.2 37.747v241z"/>
                <path d="m1530.6 293.68v-246.81h115v-43.552h-284.9v43.555h114.6v246.81h55.3z"/>
                <path
                    d="m1830.4 0c-35.7 0-84.4 0-117.1 30.696-31.9 29.865-34 78.394-34 117.8 0 32.77 0 85.45 34 117.8 32.3 30.7 82.2 30.7 117.1 30.7 33.9 0 85.1 0 117-30.7 30.2-29.03 33.6-79.64 33.6-117.8s-2.9-88.768-33.6-117.8c-32.3-30.7-82.2-30.7-117-30.7zm-94 148.5c0-44.38 6.7-67.198 18-81.302 17.2-21.155 44.9-23.644 75.5-23.644 29.8 0 58.8 2.489 76 23.644 9.2 11.2 18 31.111 18 81.302 0 46.87-8.4 68.86-18 80.89-17.6 21.98-45.8 24.06-76 24.06-30.6 0-58.3-2.08-75.5-24.06-9.7-12.03-18-33.6-18-80.89z"/>
                <path clipRule="evenodd"
                      d="m709.3 294.04h58.34l29.79-73.42h141.42l30.21 73.42h58.34l-110.79-260.91c-10.49-24.479-23.08-32.774-48.26-32.774-26.44-0.00045-37.77 8.2951-48.26 32.771l-110.79 260.91zm139.66-239.59l79.8 101.78-38.57-0.56 11.1 40.94-26.16 6.93-11.1-40.94-33.8 19.73 18.73-127.88z"
                      fillRule="evenodd"/>
            </svg>
        </a>
    </div>
);

export default CSSModules(Branding, styles, {
    allowMultiple: true
});
