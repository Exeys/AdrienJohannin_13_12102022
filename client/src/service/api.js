import axios from "axios"

class Api {
    constructor() {
        this.baseURL = "http://localhost:3001/api/v1/user"

    }

    getUserToken = async (email, password, rememberMe) => {
        return (dispatch) => {
            const response = axios.post(this.baseURL + '/login', {
                email: email,
                password: password
            }).then((response) => {
                const token = response.data.body.token
                if (rememberMe) {
                    localStorage.setItem('token', token)
                    this.setToken(token)
                }
                else if (!rememberMe) {
                    sessionStorage.setItem('token', token)
                    this.setToken(token)
                }
                dispatch({ type: 'LOGIN_SUCCESS', token: token })
            }).catch(() => {
                dispatch({ type: 'LOGIN_ERROR' })
            })
            return response
        }

    }

    getUserProfile = async () => {
        return (dispatch) => {
            const response = axios.post(this.baseURL + '/profile', {})
                .then((response) => {
                    dispatch({
                        type: 'FETCH_SUCCESS', payload: {
                            firstName: response.data.body.firstName,
                            lastName: response.data.body.lastName,
                            id: response.data.body.id,
                            email: response.data.body.email
                        }
                    })

                }).catch(() => {
                    dispatch({ type: 'FETCH_ERROR' })
                })
            return response
        }
    }

    updateUser = async (firstName, lastName) => {
        return (dispatch) => {
            const response = axios.put(this.baseURL + '/profile', {
                firstName,
                lastName
            }).then((response) => {
                dispatch({
                    type: 'EDIT_SUCCESS', payload: {
                        firstName: response.data.body.firstName,
                        lastName: response.data.body.lastName
                    }
                })
            }).catch(() => {
                dispatch({ type: 'EDIT_ERROR' })
            })
            return response
        }
    }

    setToken = (token) => {
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
        };
    }
}

export default Api;