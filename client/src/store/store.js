import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER } from 'redux-persist'

/**
 * Initial state for user Store
 */
const initialState = {
    logged: false,
    firstName: "",
    lastName: "",
    token: "",
    id: "",
    email: "",
    error: 0
}


/**
 * List of functions actions, which are called in function of returned API response
 * @param {*} payload 
 * @returns 
 */
export const LOGIN_SUCCESS = (payload) => ({ type: 'LOGIN_SUCCESS', payload })
export const LOGIN_ERROR = () => ({ type: 'LOGIN_ERROR' })
export const LOGOUT = () => ({ type: 'LOGOUT' })
export const FETCH_SUCCESS = (payload) => ({ type: 'FETCH_SUCCESS', payload })
export const FETCH_ERROR = () => ({ type: 'FETCH_ERROR' })
export const EDIT_SUCCESS = (payload) => ({ type: 'EDIT_SUCCESS', payload })
export const EDIT_ERROR = () => ({ type: 'EDIT_ERROR' })

/**
 * The store is saved in storage variable that represent localStorage
 */
const persistConfig = {
    key: 'root',
    storage,
}

/**
 * Call a function that make persistant the user Reducer
 */
const persistedReducer = persistReducer(persistConfig, userReducer)

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                logged: true
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                logged: false,
                error: 1
            };
        case 'LOGOUT':
            localStorage.clear()
            return {
                initialState
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                logged: true,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                id: action.payload.id,
                email: action.payload.email

            };
        case 'FETCH_ERROR':
            return {
                ...state,
                error: 2
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
                error: 3
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
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST],
            },
        }),
})
