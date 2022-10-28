import axios from "axios"

class Api {
    constructor() {
        this.baseURL = "http://localhost:3001/api/v1/user"

    }

    getUserToken = async (email, password) => {
        return (dispatch) => {
            const response = axios.post(this.baseURL + '/login', {
                email: email,
                password: password
            }).then((response) => {
                const token = response.data.body.token
                localStorage.setItem('token', token)
                dispatch({ type: 'LOGIN_SUCCESS', token: token })
            }).catch(() => {
                dispatch({ type: 'LOGIN_ERROR' })
            })
            return response
        }

    }

    getUserProfile = async () => {
        return (dispatch) => {
            const response = axios.post(this.baseURL + '/profile', {}, {
                headers: {
                    Authorization: `Bearer` + localStorage.getItem('token')
                }
            }).then((response) => {
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
            }, {
                headers: {
                    Authorization: `Bearer` + localStorage.getItem('token')
                }
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
}

export default Api;