import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum FormType {
    LOGIN_FORM,
    REGISTER_FORM,
    LOGOUT
}

type AppState = {
    showModal: boolean;
    modalContent: FormType
}

const initialState: AppState = { showModal: false, modalContent: FormType.LOGIN_FORM }

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setShowModal: (state, { payload }: PayloadAction<boolean>) => {
            state.showModal = payload;
        },
        setModalContent: (state, {payload}: PayloadAction<FormType>)=>{
            state.modalContent = payload;
        }
    }
});

export const { setShowModal, setModalContent } = AppSlice.actions;

export default AppSlice.reducer;