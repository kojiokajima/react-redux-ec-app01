import React from 'react'
import { useSelector } from 'react-redux';
import { getUserId,  getUsername } from "../reducks/users/selectors";

const Home = () => {
    const selector = useSelector(state => state)
    const uid = getUserId(selector)
    const username = getUsername(selector)

    return (
        <div>
            <h2>Home</h2>
            <p>User ID: {uid}</p>
            <p>Username: {username}</p>
        </div>
    )
}

export default Home