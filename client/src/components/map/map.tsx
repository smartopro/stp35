import React, {useEffect, useRef} from "react";

// Utils
import {getPageWidth, loadScript} from "../../assets/utils";

// config
import data from "../../assets/data";

// CSS
import CSSModules from "react-css-modules";
import styles from "./map.module.scss";

interface IPosition {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
}

interface IProps {
    styles?: any,
    className?: string,
    geolocationPosition?: IPosition,
    geo: [number, number],
    geoMarker?: string,
    waitMs?: number,
    ns: string
}

const Map: React.FC<IProps> = ({
    className,
    geolocationPosition,
    ns = "ymaps",
    geo,
    geoMarker
}) => {
    const mapRef = useRef(null);
    const yandexApiKey = `${process.env.YANDEX_API_KEY}`;

    useEffect(() => {
        loadScript(ns,`https://api-maps.yandex.ru/2.1/?apikey=${yandexApiKey}&lang=ru_RU&ns=${ns}`)
            .then(() => {
                // @ts-ignore
                const ymaps = window[ns];
                ymaps.ready(() => {
                    const map = new ymaps.Map(mapRef.current, {
                        center: geo,
                        zoom: 14,
                        controls: []
                    }, {
                        suppressMapOpenBlock: true,
                        maxZoom: 18
                    });

                    map.behaviors.disable('scrollZoom');

                    // Создадим пользовательский макет ползунка масштаба.
                    const ZoomLayout = ymaps.templateLayoutFactory.createClass(`
                        <div class="btn-wrapper">
                            <div id=${`zoom-in-${ns}`} class="btn">+</div>
                            <div id=${`zoom-out-${ns}`} class="btn">−</div>
                        </div>
                    `, {

                        // Переопределяем методы макета, чтобы выполнять дополнительные действия
                        // при построении и очистке макета.
                        build: function () {
                            // Вызываем родительский метод build.
                            ZoomLayout.superclass.build.call(this);

                            // Привязываем функции-обработчики к контексту и сохраняем ссылки
                            // на них, чтобы потом отписаться от событий.
                            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                            // Начинаем слушать клики на кнопках макета.
                            document.getElementById(`zoom-in-${ns}`)!.addEventListener("click", this.zoomInCallback);
                            document.getElementById(`zoom-out-${ns}`)!.addEventListener("click", this.zoomOutCallback);
                        },

                        clear: function () {
                            // Снимаем обработчики кликов.
                            document.getElementById(`zoom-in-${ns}`)!.removeEventListener("click", this.zoomInCallback);
                            document.getElementById(`zoom-in-${ns}`)!.removeEventListener("click", this.zoomOutCallback);

                            // Вызываем родительский метод clear.
                            ZoomLayout.superclass.clear.call(this);
                        },

                        zoomIn: function () {
                            const map = this.getData().control.getMap();
                            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                        },

                        zoomOut: function () {
                            const map = this.getData().control.getMap();
                            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                        }
                    }),
                    zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});
                    map.controls.add(zoomControl);

                    geolocationPosition && map.controls.add(new ymaps.control.GeolocationControl({
                        options: { position: geolocationPosition }
                    }));

                    //map.controls.add("geolocationControl", { float: "right" });

                    // Создаём макет содержимого.
                    const iconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                    )

                    const officePlacemark = new ymaps.Placemark(map.getCenter(), {
                        hintContent: `ООО «${data.contact.name}»`,
                        balloonContent: data.contact.address
                    }, geoMarker && {
                        // Опции.
                        // Необходимо указать данный тип макета.
                        iconLayout: "default#image",
                        // Своё изображение иконки метки.
                        iconImageHref: geoMarker,
                        // Размеры метки.
                        iconImageSize: getPageWidth() > 781 ? [100, 100] : [50, 50],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: getPageWidth() > 781 ? [-50, -100] : [-25, -50],
                        // Смещение слоя с содержимым относительно слоя с картинкой.
                        iconContentOffset: [15, 15],
                        // Макет содержимого.
                        iconContentLayout: iconContentLayout
                    });

                    map.geoObjects.add(officePlacemark);
                });
            });
    }, []);

    return (
        <div styleName="map-container" className={className}>
            <div styleName="map-wrapper">
                <div styleName="map" ref={mapRef} />
            </div>
        </div>
    );
};

export default CSSModules(Map, styles, {
    allowMultiple: true
});
