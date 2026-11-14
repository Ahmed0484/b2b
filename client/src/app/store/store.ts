import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
import { catalogApi } from "../../features/catalog/catalogApi";
import { basketApi } from "../../features/basket/basketApi";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { accountApi } from "../../features/account/accountApi";
import { adminApi } from "../../features/admin/adminapi";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        catalog:catalogSlice.reducer,
        [catalogApi.reducerPath]: catalogApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(catalogApi.middleware,basketApi.middleware,accountApi.middleware,adminApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()