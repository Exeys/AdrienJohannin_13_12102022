import React, { useState } from "react";
import './User.scss'
import { useSelector, useDispatch } from "react-redux"
import Api from "../../service/api";




const User = () => {

    const api = new Api()
    const state = useSelector((state) => state)
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const closeForm = () => {
        setShowForm(false)
    }
    const openForm = () => {
        setShowForm(true)
    }
    const handleEdit = async (event) => {
        event.preventDefault()
        dispatch(await api.updateUser(firstName, lastName))
    }

    return (
        <React.Fragment>
            <main className="main bg-dark">
                <div className="header">
                    {!showForm ? (
                        <div>
                            <h1>Welcome back<br />{state.firstName} {state.lastName}</h1>
                            <button className="edit-button" onClick={openForm}>Edit Name</button>
                        </div>

                    ) : (
                        <div>
                            <h1>Welcome back</h1>
                            <form onSubmit={handleEdit}>
                                <div className="header-inputs">
                                    <input className="input" placeholder={state.firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                    <input className="input" placeholder={state.lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                </div>
                                <div className="header-buttons">
                                    <button className="button" type="submit">Save</button>
                                    <button className="button" onClick={closeForm}>Cancel</button>
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