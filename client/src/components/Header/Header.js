import React from "react";
import { Link, useNavigate } from "react-router-dom"
import './Header.scss'
import logo from '../../assets/img/argentBankLogo.png'
import { useDispatch, useSelector } from "react-redux";


/**
 * A function that render Header component 
 */
const Header = () => {
    const user = useSelector((state) => state)
    const dispatch = useDispatch()
    const nav = useNavigate()

    /**
     * Function called on logout button click, 
     * call "LOGOUT" action to Redux Store and redirect user to Index
     */
    const logOut = (event) => {
        event.preventDefault()
        dispatch({ type: 'LOGOUT' })
        nav("/")
    }

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {!user.logged ? (
                <div>
                    <Link to="/signin" className="main-nav-item">
                        <i className='fa fa-sign-in'></i>
                        Sign In
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to="/user" className="main-nav-item" >
                        <i className="fa fa-user-circle"></i>
                        {user.firstName}
                    </Link>
                    <Link to="/" className="main-nav-item" onClick={logOut} >
                        <i className='fa fa-sign-out'></i>
                        Sign Out
                    </Link>
                </div>
            )}

        </nav>
    )
}

export default Header;