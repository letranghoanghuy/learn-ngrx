export interface SharedState{
    showLoading: boolean;
    errMessage: string;
}

export const initialState: SharedState = {
    showLoading: false,
    errMessage:''
}