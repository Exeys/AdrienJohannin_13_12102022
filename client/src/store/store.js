import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE } from 'redux-persist'



const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)
// state
const initialState = {
    logged: false,
    firstName: "",
    lastName: "",
    token: "",
    id: "",
    email: "",
    error: false
}


// actions
export const LOGIN_SUCCESS = (payload) => ({ type: 'LOGIN_SUCCESS', payload })
export const LOGIN_ERROR = () => ({ type: 'LOGIN_ERROR' })
export const LOGOUT = () => ({ type: 'LOGOUT' })
export const FETCH_SUCCESS = (payload) => ({ type: 'FETCH_SUCCESS', payload })
export const FETCH_ERROR = () => ({ type: 'FETCH_ERROR' })
export const EDIT_SUCCESS = (payload) => ({ type: 'EDIT_SUCCESS', payload })
export const EDIT_ERROR = () => ({ type: 'EDIT_ERROR' })



// reducer
function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                logged: true,
                token: action.token
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                logged: false,
                error: true
            };
        case 'LOGOUT':
            return {
                initialState
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                id: action.payload.id,
                email: action.payload.email

            };
        case 'FETCH_ERROR':
            return {
                ...state,
                error: true
            };
        case 'EDIT_SUCCESS':
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            }
        case 'EDIT_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
