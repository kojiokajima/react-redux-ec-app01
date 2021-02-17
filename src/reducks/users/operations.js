import { signInAction, signOutAction } from "./actions"
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from '../../firebase/index'

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))

                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const resetPassword = (email) => {
    return async(dispatch) => {
        if (email === "") {
            alert("Anything should not be blank")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Email sent to reset your password!')
                dispatch(push('/signin'))
            }).catch(() => {
                alert("Something went wrong! Try again in a bit")
            })
        }
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        //Validation
        if (email === "" || password === "") {
            alert("Anything should not be blank")
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))

                            dispatch(push('/'))

                        })
                }
            })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        //Validation
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Anything should not be blank")
            return false
        }

        if (password !== confirmPassword) {
            alert("Password does not match")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'))
                        })
                }
            })
    }
} 

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch(signOutAction())
            dispatch(push('/signin'))
        })
    }
}