import {configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "./products/productsSlice.ts";
import {productsAPI} from "./products/productsAPI.ts";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsAPI.middleware),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;