import React, {Component} from 'react'

export default class LoginClass extends Component {
    render() {

        return(
             <div>
                 <h2>Login</h2>
                 <button onClick={() => this.props.actions.signIn()}>
                     Login
                 </button>
             </div>
        )
    }
}