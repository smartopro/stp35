import React, {useMemo, useRef, useState} from "react";

// Swiper
import {Pagination, Grid, Navigation} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/scss/grid";

// components
import Face from "../../face/face";
import Breadcrumbs from "../../breadcrumbs/breadcrumbs";
import DownloadDoc from "../../download-doc/download-doc";

// data
import {withIDs} from "../../../assets/utils";
import data from "../../../assets/data";

// CSS
import CSSModules from "react-css-modules";
import cn from "classnames";
import styles from "./about.module.scss";
import "./gallery.scss";

const About: React.FC = () => {
    const phone = useMemo(() => data.contact.phone, []);
    const gallery = withIDs(useMemo(() => data.pages.about.gallery, []));
    const [galleryId, setGalleryId] = useState<{ prev?: number, current?: number }>({});
    const btnNext = useRef(null);
    const btnPrev = useRef(null);
    const id = galleryId.current ?? galleryId.prev;

    return (
        <main styleName="about">
            <div
                styleName={cn("overlay", {"overlay_visible": galleryId.current !== undefined})}
                onClick={() => setGalleryId(prevId => ({prev: prevId.current}))}>
                <div styleName="overlay__content">
                    <div styleName="overlay__image-wrapper">
                        {id !== undefined && <img styleName="overlay__image" src={gallery[id].image} alt={gallery[id].title} />}
                        <div styleName="overlay__close">&#x2715;</div>
                        <div styleName="overlay__text">
                            <div>{id !== undefined && gallery[id].title}</div>
                            <div>{id !== undefined && gallery[id].date?.toLocaleDateString() + "г."}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Breadcrumbs currentPageTitle="О нас" />

            <Face
                image={require("images/about/main.png")}
                header="Кто мы"
                phone={phone}
                text={`
                    <p>Мы одна из крупных фирм в городе Вологде по количеству специалистов. У нас работают 20 слесарей-сантехников, 4 бригады по электро-газосварке.</p>
                    <p>Все специалисты организации имеют опыт работы более 10 лет. Проходят постоянное обучение и проверку знаний.</p>
                `}
                button="Оставить заявку"
            />

            <section className="section" styleName="download">
                <DownloadDoc
                    styleName="download__item"
                    title="Постановление Правительства от 17.04.2021&nbsp;г."
                    href={require("./doc-1.docx")}
                    size={83}
                    icon={require("images/about/clip.svg")}
                />
                <DownloadDoc
                    styleName="download__item"
                    title="Постановление Правительства от 17.04.2021&nbsp;г."
                    href={require("./doc-2.docx")}
                    size={83}
                    icon={require("images/about/clip.svg")}
                />
            </section>

            <section className="section section__content">
                <h2 className="section__header" styleName="gallery-header">Галерея</h2>
                <div styleName="gallery-wrapper">
                    <Swiper
                        modules={[Pagination, Grid, Navigation]}
                        breakpoints={{
                            0: {
                                grid: { fill: "row", rows: 2 },
                                slidesPerView: 1
                            },
                            781: {
                                grid: { fill: "row", rows: 2 },
                                slidesPerView: 2
                            },
                            1201: {
                                grid: { fill: "row", rows: 2 },
                                slidesPerView: 3
                            }
                        }}
                        navigation={{ prevEl: btnPrev.current, nextEl: btnNext.current }}
                        pagination={{clickable: true}}
                        styleName="gallery"
                        spaceBetween={10}
                        onInit={
                            swiper => {
                                setTimeout(() => {
                                    (swiper.params.navigation as any).nextEl = btnNext.current;
                                    (swiper.params.navigation as any).prevEl = btnPrev.current;
                                    swiper.navigation.init();
                                }, 0);
                            }
                        }
                    >
                        {
                            gallery.map(item => (
                                <SwiperSlide
                                    key={item.id}
                                    styleName="gallery__slide"
                                    onClick={() => {
                                        setGalleryId(prevId => ({
                                            prev: prevId.current,
                                            current: item.id
                                        }));
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        styleName="gallery__image"
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div styleName="bg bg_right" />
                    <div styleName="bg bg_left" />
                    <div styleName="btn btn_prev" className="swiper-button-disabled" ref={btnPrev} />
                    <div styleName="btn btn_next" ref={btnNext} />
                </div>
            </section>
        </main>
    )
};

export default CSSModules(About, styles, {
    allowMultiple: true
});
