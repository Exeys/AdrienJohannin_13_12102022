import React, { useState } from "react";
import './User.scss'
import { useSelector, useDispatch } from "react-redux"
import Api from "../../service/api";
import { Navigate } from "react-router-dom";




/**
 * A component page which render User bank informations
 */

const User = () => {

    const api = new Api()
    const user = useSelector((state) => state)
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)
    let [firstName, setFirstName] = useState(user.firstName)
    let [lastName, setLastName] = useState(user.lastName)

    /**
     * If edit name is clicked, a form is displayed
     */

    const handleForm = () => {
        if (showForm) {
            setShowForm(false)
        } else {
            setShowForm(true)
        }

    }

    /**
     * If user choosed to saved new name parameters, 
     * then api is called with the new wanted ones and closed the form
     */
    const handleEdit = async (event) => {
        event.preventDefault()
        dispatch(await api.updateUser(firstName, lastName))
        handleForm()
    }

    /**
     * If user isn't logged, is redirected to index page
     */
    if (!user.logged) {
        return <Navigate to='/' />
    }
    return (
        <React.Fragment>
            <main className="main bg-dark">
                <div className="header">
                    {!showForm ? (
                        <div>
                            <h1>Welcome back<br />{user.firstName} {user.lastName}</h1>
                            <button className="edit-button" onClick={handleForm}>Edit Name</button>
                        </div>

                    ) : (
                        <div>
                            <h1>Welcome back</h1>
                            <form onSubmit={handleEdit}>
                                <div className="header-inputs">
                                    <input className="input" placeholder={user.firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                    <input className="input" placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                </div>
                                <div className="header-buttons">
                                    <button className="button" type="submit">Save</button>
                                    <button className="button" onClick={handleForm}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )

}

export default User;