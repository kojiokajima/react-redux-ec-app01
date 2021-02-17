import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {signIn} from '../reducks/users/operations'
import {push} from 'connected-react-router';

const SignIn = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword])

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">Sign In</h2>
            <div className="module-spacer--medium"></div>
            <TextInput
                fullWidth={true} label={"Email"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"Password"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium"></div>
            <div className="center">
                <PrimaryButton
                    label={"Sign In"}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <p onClick={() => dispatch(push('/signup'))}>Does not have an account yet? Register here!</p>
                <p onClick={() => dispatch(push('/signin/reset'))}>Forgot password?</p>

            </div>
        </div>
    )
}

export default SignIn