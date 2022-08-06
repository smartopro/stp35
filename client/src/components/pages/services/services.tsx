import React, {Fragment, useCallback, useMemo, useState} from "react";
import {withIDs} from "../../../assets/utils";

// components
import SVGImage from "../../svg-image/svg-image";
import Face from "../../face/face";
import data from "../../../assets/data";
import Breadcrumbs from "../../breadcrumbs/breadcrumbs";

// CSS
import cn from "classnames";
import CSSModules from "react-css-modules";
import styles from "./services.module.scss";

const Services: React.FC = () => {
    const phone = useMemo(() => data.contact.phone, []);
    const faq = useMemo(() => withIDs(data.pages.services.faq), []);
    const [faqSelected, setFaqSelected] = useState<number | null>(null);
    const [answerNodes, setAnswerNodes] = useState<HTMLDivElement[]>([]);
    const cbAnswerRef = useCallback((node: HTMLDivElement) => {
        setAnswerNodes(nodes => [...nodes, node])
    }, []);

    const textLeft = "xxl-b4-h xxl-s4-h l-b3-h l-s4-h m-b2-h m-s4-h s-s2-h",
        textRight = "xxl-b8-h xxl-er4-h l-b9-h l-er2-h m-b6-h s-b4-h xs-b2-h",
        headerLeft = "xxl-b3-h xxl-s5-h l-b2-h l-s6-h m-s4-h s-er2-h",
        headerRight = "xxl-b7-h xxl-er2-h xl-er4-h l-er2-h m-b5-h s-b3-h xs-b2-h xs-s2-h",
        preHeaderRight = "xxl-b1-h xxl-s6-h m-s4-h",
        imageLeft = "xxl-s6-h l-s7-h m-s5-h s-s3-h",
        imageRight = "xxl-br6-h xxl-last-h l-br7-h m-b6-h s-b4-h xs-b2-h";

    return (
        <main styleName="services">
            <Breadcrumbs currentPageTitle="Услуги" />

            <Face
                image={require("images/services/main.png")}
                header="Услуги"
                text={`
                    <p>Мы одна из крупных фирм в городе Вологде по количеству специалистов. У нас работают 20 слесарей-сантехников, 4 бригады по электро-газосварке.</p>
                    <p>Все специалисты организации имеют опыт работы более 10 лет. Проходят постоянное обучение и проверку знаний.</p>
                `}
                phone={phone}
                button="Оставить заявку"
            />

            <section className="grid">
                <h2 className={headerLeft} styleName="header">Подготовка к отопительному сезону</h2>
                <img
                    className={`${imageRight} xxl-s2-v s-s1-v`}
                    styleName="image image_right image_fit-right image_01"
                    src={require("images/services/content-01.jpg")}
                    alt="Подготовка к отопительному сезону"
                />
                <ul className={`list ${textLeft}`} styleName="text">
                    <li>ремонт, промывка и гидравлические испытания систем отопления;</li>
                    <li>укомплектованность тепловых узлов, элеваторных и тепловых узлов поверенными контрольно-измерительными приборами;</li>
                    <li>восстановление тепловой изоляции на трубопроводах, расширительных баках, регулирующей аппаратуре;</li>
                    <li>наладочные работы по системам тепло-, водоснабжения, где по результатам эксплуатации в предстоящий зимний период не были обеспечены требуемые параметры;</li>
                </ul>

                <div className={preHeaderRight} />
                <h2 className={headerRight} styleName="header header_02">Капитальный ремонт и реконструкция систем водоснабжения, водоотведения и отопления</h2>
                <img className={imageLeft} styleName="image image_left image_02-1" src={require("images/services/content-02.jpg")} alt="Капитальный ремонт и реконструкция систем водоснабжения, водоотведения и отопления" />
                <div className={textRight} styleName="text">
                    <div>Ремонт или замена инженерных систем.</div>
                    <ul className="list" aria-label="Холодного водоснабжения, в том числе:">
                        <li>Ремонт или замена водомерных узлов;</li>
                        <li>Ремонт или замена разводящих магистралей и стояков;</li>
                        <li>Замена запорной арматуры, в том числе на ответвлении от стояков в квартиру;</li>
                        <li>Ремонт или замена в комплексе оборудования повысительных насосных установок;</li>
                        <li>Ремонт или замена оборудования, трубопроводов и оснащения пожарного водопровода.</li>
                    </ul>
                    <ul className="list" aria-label="Ремонт или замена системы горячего водоснабжения, в том числе:">
                        <li>Ремонт или замена ТРЖ, теплообменников, бойлеров, насосных установок и другого оборудования (в составе общего имущества) в комплексе для приготовления и подачи горячей воды в распределительную сеть;</li>
                        <li>Ремонт или замена разводящих магистралей и стояков.</li>
                    </ul>
                    <div>Замена запорной арматуры, в том числе на ответвлении от стояков в квартиру.</div>
                </div>
                <div className={textLeft} styleName="text text_02-2">
                    <ul className="list" aria-label="Ремонт или замена системы канализации и водоотведения, в том числе:">
                        <li>Ремонт или замена выпусков, сборных трубопроводов, стояков и вытяжек.</li>
                        <li>Замена задвижек при их наличии.</li>
                    </ul>
                    <ul className="list" aria-label="Ремонт или замена системы отопления, в том числе:">
                        <li>Ремонт или замена разводящих магистралей и стояков;</li>
                        <li>Замена запорной и регулировочной арматуры, в том числе на ответвлении от стояков к отопительным приборам в жилых помещениях.</li>
                    </ul>
                    <div>Перегруппировка или замена отопительных приборов в местах общего пользования, замена ответвлений от стояков и отопительных приборов в жилых помещениях.</div>
                    <div>Установка, ремонт или замена в комплексе оборудования ИТП (индивидуальных тепловых пунктов) и при наличии повысительных насосных установок.</div>
                </div>
                <img className={imageRight} styleName="image image_right image_02-2" src={require("images/services/content-03.jpg")} alt="Ремонт систем водоснабжения и водоотведения" />

                <div className={preHeaderRight} />
                <h2 className={headerRight} styleName="header">Текущий ремонт систем водоснабжения, водоотведения и отопления</h2>
                <img className={imageLeft} styleName="image image_left image_03" src={require("images/services/content-04.jpg")} alt="Текущий ремонт систем отопления" />
                <div className={textRight} styleName="text">
                    <div>Установка, замена и восстановление работоспособности отдельных элементов и частей элементов внутренних систем центрального отопления;</div>
                    <div>Установка, замена и восстановление работоспособности отдельных элементов и частей элементов внутренних систем водопроводов и канализации, горячего водоснабжения, включая насосные установки в жилых зданиях.</div>
                </div>

                <h2 className={headerLeft} styleName="header header_04" >Аварийно-диспетчерское обслуживание круглосуточно</h2>
                <img className={`${imageRight} xxl-s2-v s-s1-v`} styleName="image image_right image_04" src={require("images/services/content-05.jpg")} alt="Аварийно-диспетчерское обслуживание круглосуточно" />
                <div className={textLeft} styleName="text text_04">
                    Работа ОДС осуществляется круглосуточно. Служба ОДС ведет непрерывный контроль за работой инженерного оборудования, регистрирует его работу в соответствующих журналах и немедленно устраняет мелкие неисправности и аварии; о всех авариях или перерывах в работе систем водоснабжения, канализации, тепло-, электроснабжения срочно сообщает в аварийную службу организации по обслуживанию жилищного фонда, а также в специализированные организации, обслуживающие лифты, газовое оборудование, водопроводно-канализационное и др.
                </div>
            </section>

            <section styleName="faq" className="grid">
                <h2 className={headerLeft} styleName="header header_faq">Вопросы и ответы</h2>
                <div
                    // VOID-SPAN
                    className="xxl-b1-h xxl-s3-h l-s2-h m-s1-h s-s1-h s-b2-v"
                    style={{ gridRowEnd: `span ${faq.length}` }}
                />
                <div
                    // IMAGE_QUESTION
                    className={`xxl-b4-h xxl-s2-h l-b3-h m-b2-h m-s2-h s-br1-h s-s1-h`}
                    styleName="image-super-wrapper"
                    style={{ gridRowEnd: `span ${faq.length}` }}
                >
                    <div styleName="image-wrapper image-wrapper_question">
                        <SVGImage
                            path={require("images/services/question.svg")}
                            styleName="image-wrapper__svg"
                        />
                        <img
                            src={require("images/services/faq-2.jpg")}
                            styleName="image-wrapper__image"
                            alt="Вопросы"
                        />
                    </div>
                </div>

                {
                    faq.map(faqItem => (
                        <Fragment key={faqItem.id}>
                            <div
                                // TEXT-QUESTION
                                className="xxl-b6-h xxl-s3-h l-b5-h l-s4-h m-b4-h m-s3-h s-b2-h s-s2-h xs-s2-h"
                                styleName="question"
                                onClick={() => setFaqSelected(faqItem.id === faqSelected ? null : faqItem.id)}
                            >
                                <div styleName="question__text">{faqItem.question}</div>
                                <div styleName={
                                    cn(
                                        "question__arrow",
                                        { question__arrow_selected: faqSelected === faqItem.id }
                                    )
                                } />
                            </div>
                            {/* TEXT-ANSWER */}
                            <div className="xxl-br6-h xxl-s3-h m-br4-h m-s3-h s-br3-h s-s2-h xs-b2-h xs-s2-h" styleName="answer">
                                <div
                                    styleName={cn("answer__text-wrapper", {
                                        "answer__text-wrapper_selected": faqItem.id === faqSelected
                                    })}
                                    style={{
                                        minHeight: faqItem.id === faqSelected ? answerNodes[faqSelected]?.offsetHeight : 0,
                                    }}
                                >
                                    <div ref={cbAnswerRef} styleName="answer__text">
                                        { faqItem.answer }
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))
                }

                <div
                    // IMAGE_ANSWER
                    className="xxl-br6-h xxl-s3-h m-br4-h s-br3-h s-s2-h"
                    styleName="image-super-wrapper"
                    style={{
                        gridRowStart: faq.length + 2
                    }}
                >
                    <div styleName="image-wrapper image-wrapper_answer">
                        <SVGImage
                            path={require("images/services/exclamation.svg")}
                            styleName="image-wrapper__svg"
                        />
                        <img
                            src={require("images/services/faq-1.jpg")}
                            styleName="image-wrapper__image"
                            alt="Ответы"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
};

export default CSSModules(Services, styles, {
    allowMultiple: true
});
