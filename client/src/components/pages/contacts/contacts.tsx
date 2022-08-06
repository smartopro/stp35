import React, {useMemo} from "react";

// components
import Breadcrumbs from "../../breadcrumbs/breadcrumbs";
import Map from "../../map/map";


// data
import data from "../../../assets/data";
import {phoneToTel} from "../../../assets/utils";

// CSS
import CSSModules from "react-css-modules";
import styles from "./contacts.module.scss";
import Form from "../../form/form";

const Contacts: React.FC = () => {
    const contact = useMemo(() => data.contact, []);

    return (
        <main styleName="contacts">
            <Breadcrumbs currentPageTitle="О нас" />

            <section className="section grid" styleName="section-map">
                <Map
                    styles={styles}
                    className="xxl-b2-h xxl-s4-h xxl-s2-v l-b1-h l-s5-h m-s4-h s-s2-h s-s1-v"
                    geo={contact.geo}
                    geoMarker={require("images/geo-marker.png")}
                    waitMs={1000}
                    ns="ymaps"
                />
                <h1 className="xxl-b6-h xxl-last-h m-b5-h s-b1-h face__header" styleName="header">Контакты</h1>
                <div className="xxl-b7-h xxl-s3-h l-s4-h m-b5-h m-s2-h s-b3-h s-s1-h xs-b1-h xs-last-h" styleName="section-map__text">
                    <div className="p">Мы всегда рады новому сотрудничеству, поэтому даже если требуется просто небольшой совет, смело обращайтесь, мы с радостью Вам поможем!</div>
                    <div dangerouslySetInnerHTML={{ __html: `Наш адрес: ${contact.address}` }} />
                    <div className="p">
                        <div>Режим работы:</div>
                        <div>пн - пт: {contact.workingTime}</div>
                        <div>сб, вс: выходной</div>
                    </div>
                    <div className="p">
                        <div>Телефон</div>
                        <a className="link" href={`tel:${phoneToTel(contact.phoneDisp)}`}>{contact.phoneDisp}</a>
                        <div>Электронная почта</div>
                        <a className="link" href={`mailto:${contact.email}`}>{contact.email}</a>
                    </div>
                </div>
                <div className="xxl-br2-h l-s2-h s-br1-h s-s1-h xs-b1-h xs-last-h" styleName="info-box-wrapper">
                    <div styleName="info-box">
                        <div styleName="info-box__pill" className="bg-pill">
                            <span>24<br/>часа</span>
                        </div>
                        <div>Диспетчерская</div>
                        <a
                            className="link"
                            styleName="info-box__phone"
                            href={`tel:${phoneToTel(contact.phoneDisp)}`}
                        >
                            {contact.phoneDisp}
                        </a>
                        <a
                            className="link"
                            styleName="info-box__email"
                            href={`mailto:${contact.email}`}
                        >
                            {contact.email}
                        </a>
                    </div>
                </div>
            </section>
            <section className="section" styleName="consult">
                <div styleName="consult__content">
                    <h2 className="section__header section__header_bold" styleName="consult__header">Бесплатная консультация</h2>
                    <div styleName="consult__subheader">Оставьте заявку через интернет или позвоните нам мы обязатеьно проконсультируем и решим ваши задачи</div>
                    <Form
                        styles={styles}
                        styleName="consult__form"
                        button="Заказать услуги"
                        isTextArea={true}
                    />
                </div>
                <img styleName="consult__image" src={require("images/contacts/consult.png")} alt="Контакты" />
            </section>
        </main>
    )
};

export default CSSModules(Contacts, styles, {
    allowMultiple: true
});
