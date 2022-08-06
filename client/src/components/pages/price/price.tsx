import React, {useMemo, useState} from "react";

// components
import Face from "../../face/face";
import Breadcrumbs from "../../breadcrumbs/breadcrumbs";
import Table from "../../table/table";
import Input from "../../input/input";

// data
import data from "../../../assets/data";

// CSS
import CSSModules from "react-css-modules";
import styles from "./price.module.scss";
import {phoneToTel} from "../../../assets/utils";

const Price: React.FC = () => {
    const phone = useMemo(() => data.contact.phone, []);
    const [queryPrice, setQueryPrice] = useState("");

    return (
        <main styleName="price">
            <Breadcrumbs currentPageTitle="Цены" />

            <Face
                image={require("images/price/main.png")}
                header="Наши цены"
                phone={phone}
                button="Оставить заявку"
            />

            <section className="section section__content" styleName="content">
                <Input
                    styleName="query"
                    value={queryPrice}
                    setValue={setQueryPrice}
                    image={require("images/find.svg")}
                    placeholder="Найти услугу"
                />
                <Table
                    title="Прайс-лист на сантехнические работы"
                    data={data.pages.price}
                    query={queryPrice}
                />
                <div styleName="hint">
                    *Материалы и расходные элементы в расценки не включены!
                </div>
                <div styleName="info">
                    <div styleName="info__header">
                        Заказ услуг, а также прием пожеланий и предложений производится по телефону <a styleName="info__phone" href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>{data.contact.phoneDisp}</a>
                    </div>
                    <div styleName="info__content">
                        <div styleName="info__item-pill">
                            <div styleName="info__pill" className="bg-pill">
                                <span>Скидка<br/>10%</span>
                            </div>
                            <div styleName="info__item-text">Держателям карт «Забота», а также ветеранам ВОВ.</div>
                        </div>
                        <div styleName="info__item-pill">
                            <div styleName="info__pill" className="bg-pill">
                                <span>Гарантия<br/>6 мес.</span>
                            </div>
                            <div styleName="info__item-text">Гарантийный срок на работы – 6 месяцев.</div>
                        </div>
                        <div styleName="info__text">
                            <p>На расценки на срочные работы, а также работы в стесненных условиях применяется коэффициент 1,5. В случае, если демонтажные работы на кокой-либо вид услуг не представлены, стоимость их 50% от стоимости монтажных работ.</p>
                            <p>Вынос старого оборудования и мусора 100 руб/этаж в доме без лифта. 300 руб в доме с лифтом.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
};

export default CSSModules(Price, styles, {
    allowMultiple: true
});
