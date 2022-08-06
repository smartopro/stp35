import React, {useMemo} from "react";

import data from "../../assets/data"

// CSS
import CSSModules from "react-css-modules";
import styles from "./table.module.scss";

interface IData {
    headers: string[],
    content: Record<string, Array<(string | number)[]>>
}

interface IProps {
    className?: string,
    title?: string,
    // data: IData,
    data: typeof data.pages.price,
    query?: string
}

const Table: React.FC<IProps> = ({className, title, data, query}: IProps) => {
    const filteredData = useMemo<typeof data.content>(() => (query === undefined || query === "")
        ? data.content
        : Object.fromEntries(
            Object
                .entries(data.content)
                .map(([header, sectionData]) => [header, sectionData.filter(item => item[0].toString().toUpperCase().includes(query.toUpperCase()))])
                .filter(([_, sectionData]) => sectionData.length !== 0)
        ), [query]
    );

    if (Object.keys(filteredData).length === 0) return <div styleName="root_not-found">Ничего не найдено</div>

    return (
        <table
            className={className}
            styleName="root"
        >
            <thead>
                {
                    title && <tr styleName="title">
                        <th styleName="cell cell_title" colSpan={data.headers.length}>{title}</th>
                    </tr>
                }
                <tr styleName="header">
                    {
                        data.headers.map(item => (
                            <th key={item} styleName="cell cell_header">{ item }</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    Object.entries(filteredData).map(([header, sectionData]) => (
                        <React.Fragment key={header}>
                            <tr styleName="row">
                                <td styleName="cell cell_section-header" colSpan={data.headers.length}>{header}</td>
                            </tr>
                            {
                                sectionData.map(row => (
                                    <tr styleName="row" key={row[0]}>
                                        {
                                            row.map((cell, idx) => (
                                                <td
                                                    styleName="cell"
                                                    key={idx}
                                                    dangerouslySetInnerHTML={{ __html: idx === 0
                                                            ? cell.toString().replaceAll(new RegExp(`(${query})`, "gi"), "<mark>$1</mark>")
                                                            : (typeof cell === "number" ? `${cell.toString()} ₽` : cell) }} />
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </tbody>
        </table>
    );
};

export default CSSModules(Table, styles, {
    allowMultiple: true
});
