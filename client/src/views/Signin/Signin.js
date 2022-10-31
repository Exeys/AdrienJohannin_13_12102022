import React, { useEffect, useState } from "react";
import './Signin.scss'
import Api from "../../service/api";
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom";

const Signin = () => {

    useEffect(() => {
        const fetchdata = async () => {
            if (token) {
                api.setToken(token)
                dispatch(await api.getUserProfile())
            }
        }
        fetchdata()

    })

    const api = new Api()
    const user = useSelector((state) => state)
    const dispatch = useDispatch()
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const token = localStorage.getItem('token')

    const handleLogin = async (event) => {
        console.log(rememberMe)
        event.preventDefault()
        dispatch(await api.getUserToken(userName, password, rememberMe))

        setTimeout(async () => {
            dispatch(await api.getUserProfile())
        }, 300);

    }

    if (user.logged) {
        return <Navigate to='/user' />
    }

    return (
        <React.Fragment>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" onChange={(e) => setRememberMe(!rememberMe)} />
                            <label htmlFor="remember-me"
                            >Remember me</label>
                        </div>
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                    {user.error ? <p>Clique à nouveau</p> : ""}
                </section>
            </main>
        </React.Fragment>
    )
}

export default Signin;