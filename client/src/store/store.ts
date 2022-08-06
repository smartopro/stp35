import {createContext} from "./storeUtils";
import appStore from "./app-store";

export const {StoreProvider, useStore} = createContext({
	appStore
});
