import React, {useMemo} from "react";
import {observer} from "mobx-react-lite";

// Components
import Button from "../../button/button";
import Accordion from "../../accordion/accordion";
import Form from "../../form/form";
import data from "../../../assets/data";
import {phoneToTel, withIDs} from "../../../assets/utils";
import SVGImage from "../../svg-image/svg-image";
import {useStore} from "../../../store/store";

// CSS
import CSSModules from "react-css-modules";
import styles from "./home-page.module.scss";
import cn from "classnames";

const HomePage: React.FC = () => {
    const {popupVisibleToggle} = useStore("appStore");
    const dataWorks = useMemo(() => withIDs(data.pages.home.works), []);

    return (
        <main styleName="home-page">
            <section className="section section__content face" styleName="first-screen">
                <img className="face__img" src={require("images/homepage/main.png")} alt="main photo" />
                <div styleName="first-screen__headers">
                    <h1 styleName="first-screen__header">Делаем жизнь людей комфортной и удобной</h1>
                    <h2 styleName="first-screen__subheader">Работы по отоплению, водоотведению и канализации</h2>
                    <div styleName="cta">
                        <div styleName="cta__contact">
                            <a styleName="cta__phone" href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>{data.contact.phoneDisp}</a>
                            <Button styleName="cta__button" onClick={popupVisibleToggle}>Оставить заявку</Button>
                        </div>
                        <ul
                            className="list"
                            styleName="cta__list"
                            aria-label="За две недели обработано:"
                        >
                            <li>438 заявок дневной службой</li>
                            <li>145 заявок аварийно-диспетчерской службой</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section section__content" styleName="services">
                <h2 className="section__header section__header_bold" styleName="services__header">Наши услуги и сервисы</h2>
                <Accordion data={data.pages.home.services.accordion} styleName="services__accordion" propsStyles={styles} />
            </section>

            <section className="section section__content bg-accent" styleName="balls">
                <div className="section__content" styleName="balls__content">
                    {
                        data.pages.home.balls.map(item => (
                            <div styleName="balls__item" key={item.title}>
                                <SVGImage styleName="balls__svg" path={item.image} />
                                <div styleName="balls__title">{item.title}</div>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="section section__content" styleName="reliability">
                <h2 className="section__header section__header_bold" styleName="reliability__header">С нами надёжно</h2>
                <div styleName="reliability__text">
                    <p>Вызвать сантехника-слесаря круглосуточно в Вологде через сервис «Сантехпром» значит выбрать лучших специалистов в этой сфере.</p>
                    <p>У нас работают ответственные мастера, относящиеся к своему делу аккуратно и профессионально. Проблемы с вашей сантехникой будут решены быстро и качественно!</p>
                    <p>Мы ценим время наших клиентов.</p>
                    <ul
                        className="list"
                        aria-label="Вызывая сантехника на дом в Вологде через «Сантехпром», клиент получает лучший сервис в городе:"
                    >
                        <li>приезд мастера в течение 30 минут после обращения или в согласованное время без опоздания;</li>
                        <li>в работе используем только профессиональный, надежный инструмент;</li>
                        <li>не оставляем после себя мусор и грязь;</li>
                        <li>вызов слесаря-сантехника для решения проблем в Вологде возможен в любой день недели и круглосуточно;</li>
                        <li>предоставляем гарантию на оказанные услуги;</li>
                        <li>в пределах Вологды в случае выполнения работ выезд специалиста – бесплатный;</li>
                    </ul>
                    <p>Консультация после выезда и диагностики.</p>
                    <p>У нас 20 слесарей-сантехников, 4 бригады по электро-газосварке. Все специалисты организации имеют опыт работы более 10 лет, проходят постоянное обучение и проверку знаний.</p>
                    <p>Обращаясь в «Сантехпром», вы полностью можете доверить нам свои проблемы с сантехникой!</p>
                </div>
            </section>

            <section className="section bg-accent" styleName="how">
                <img styleName="how__image how__image_1" src={require("images/homepage/how-1.png")} alt="Как мы работаем" />
                <img styleName="how__image how__image_2" src={require("images/homepage/how-2.png")} alt="Как мы ещё работаем" />
                <div className="section__content">
                    <h2 className="section__header section__header_bold" styleName="how__header">Как мы работаем</h2>
                    <div styleName="how__steps">
                        <div styleName="step arrow-right">
                            Оставьте заявку на сайте или позвоните
                            <div styleName="step__number">1</div>
                        </div>
                        <div styleName="step arrow-down">
                            Встреча с мастером
                            <div styleName="step__number">2</div>
                        </div>
                        <div styleName="step step_hidden" />
                        <div styleName="step step_hidden" />
                        <div styleName="step arrow-right">
                            Выполнение работ
                            <div styleName="step__number">3</div>
                        </div>
                        <div styleName="step">
                            Подписание акта о выполненных работах
                            <div styleName="step__number">4</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section__content" styleName="objects">
                <h2 className="section__header section__header_bold" styleName="objects__header">Наши объекты</h2>
                {
                    dataWorks.map(
                        work => (<div key={work.id} styleName={
                            cn("objects__wrapper", {
                                objects__wrapper_s: work.size === "s",
                                objects__wrapper_l: work.size === "l"
                            })
                        }>
                            { work.image && <img styleName="objects__image" src={work.image} alt={work.description} /> }
                            { work.description && <div styleName="objects__description">{ work.description }</div> }
                    </div>))
                }
            </section>

            <section className="section" styleName="consult">
                <div className="section__content">
                    <h2 className="section__header section__header_bold" styleName="consult__header">Бесплатная консультация</h2>
                    <div styleName="consult__content">
                        <div styleName="consult__info">
                            <div styleName="consult__text">
                                Оставьте заявку через интернет или позвоните нам мы обязательно проконсультируем и решим ваши задачи
                            </div>
                            <a styleName="consult__phone" href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
                            <div styleName="consult__details">
                                <div>Режим работы:</div>
                                <div>Понедельник - Пятница: {data.contact.workingTime}</div>
                                <div>Суббота, Воскресенье: выходной</div>
                            </div>
                        </div>
                        <Form styles={styles} styleName="consult__form" button="Заказать услуги" isTextArea={true} />
                    </div>
                </div>
            </section>
        </main>
    )
};

export default observer(CSSModules(HomePage, styles, {
    allowMultiple: true
}));
