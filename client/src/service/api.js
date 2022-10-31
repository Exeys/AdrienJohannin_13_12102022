import axios from "axios"

/**
 * Class grouping query function for Argent Bank API
 */
class Api {

    /**
     * Default config URL for axios queries
     */
    constructor() {
        this.baseURL = "http://localhost:3001/api/v1/user"

    }

    /**
     * Fetch token for API usage
     * @param {string} email 
     * @param {string} password 
     * @param {boolean} rememberMe 
     * @returns 
     */

    getUserToken = async (email, password, rememberMe) => {
        return (dispatch) => {
            const response = axios.post(this.baseURL + '/login', {
                email: email,
                password: password
            }).then((response) => {
                const token = response.data.body.token
                if (rememberMe) {
                    /**
                     * If user click on rememberMe input, token is saved in localStorage
                     */
                    localStorage.setItem('token', token)
                    this.setToken(token)
                }
                else if (!rememberMe) {
                    /**
                     * If user do not click on rememberMe input, token is saved in sessionStorage
                     */
                    sessionStorage.setItem('token', token)
                    this.setToken(token)
                }
                /**
                 * Pass "LOGIN_SUCCESS" action to Redux Store
                 */
                dispatch({ type: 'LOGIN_SUCCESS', token: token })
            }).catch(() => {
                /**
                 * Pass "LOGIN_ERROR" action to Redux Store
                 */
                dispatch({ type: 'LOGIN_ERROR' })
            })
            return response
        }

    }
    /**
     * Fetch datas for saved token's user in storage
     * @returns 
     */
    getUserProfile = async () => {
        return (dispatch) => {
            const response = axios.post(this.baseURL + '/profile', {})
                .then((response) => {
                    /**
                     * Pass "FETCH_SUCCES" action to Redux Store, 
                     * which add informations relative to user in the store
                     */
                    dispatch({
                        type: 'FETCH_SUCCESS', payload: {
                            firstName: response.data.body.firstName,
                            lastName: response.data.body.lastName,
                            id: response.data.body.id,
                            email: response.data.body.email
                        }
                    })

                }).catch(() => {
                    /**
                     * Pass "FETCH_ERROR" action to Redux Store
                     */
                    dispatch({ type: 'FETCH_ERROR' })
                })
            return response
        }
    }

    /**
     * Update the user informations in API
     * @param {string} firstName 
     * @param {string} lastName 
     * @returns 
     */
    updateUser = async (firstName, lastName) => {
        return (dispatch) => {
            const response = axios.put(this.baseURL + '/profile', {
                firstName,
                lastName
            }).then((response) => {
                /**
                 * Pass "EDIT_SUCCES" action to Redux Store,
                 * which update in it too
                 */
                dispatch({
                    type: 'EDIT_SUCCESS', payload: {
                        firstName: response.data.body.firstName,
                        lastName: response.data.body.lastName
                    }
                })
            }).catch(() => {
                /**
                 * Pass "EDIT_ERROR" action to Redux Store
                 */
                dispatch({ type: 'EDIT_ERROR' })
            })
            return response
        }
    }

    /**
     * Set token for axios queries headers relative to storage
     * @param {string} token 
     */
    setToken = (token) => {
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
        };
    }
}

export default Api;