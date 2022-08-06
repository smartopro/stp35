// libs
import React from "react";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";

// components
import {useStore} from "../../store/store";
import Router from "../router/router";
import Header from "../header/header";
import Popup from "../popup/popup";
import Footer from "../footer/footer";
import SVGSymbols from "../svg-symbols/svg-symbols";

// styles
import CSSModules from "react-css-modules";
import styles from "./app.module.scss";
import cn from "classnames";
import RouterScrollToTop from "../router-scroll-to-top/router-scroll-to-top";

const App: React.FC = () => {
    const {isPopupVisible, popupVisibleToggle} = useStore("appStore");
    document.body.style.overflowY = isPopupVisible ? "hidden" : "auto";

    return (
        <BrowserRouter basename={`${process.env.BASE_PATH}`}>
            <RouterScrollToTop />
            <div styleName="app">
                <div styleName={cn("blurrable", {"blurrable_blurred": isPopupVisible})}>
                    <SVGSymbols />
                    <Router />
                    <Footer />
                </div>
                <Header styleName={cn("blurrable", {"blurrable_blurred": isPopupVisible})} />
                <Popup isVisible={isPopupVisible} toggle={popupVisibleToggle} />
            </div>
        </BrowserRouter>
    )
};

export default observer(CSSModules(App, styles, {
    allowMultiple: true
}));
