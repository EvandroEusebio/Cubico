import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authentication/authSlice";
import infoImovelReducer from "../infoImovel/infoImovelSlice.js";


export const Store = configureStore({
    reducer: {
        auth: authReducer,
        infoImovel: infoImovelReducer
    },
})