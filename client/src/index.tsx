import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// styles
import "normalize.css";
import "style/fonts.scss";
import "./index.scss";

// components
import App from "./components/app/app";
import Loader from "./components/loader/loader";
import { StoreProvider } from "./store/store";

ReactDOM.render(
    <Suspense fallback={ <Loader /> }>
        <StoreProvider>
            <App/>
        </StoreProvider>
    </Suspense>,
    document.getElementById("root")
);
