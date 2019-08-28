import React, { Component } from 'react';

import styles from "./FormStyle.module.css";

export default class Login extends Component {
    state = {
        loginEmail: '',
        loginPassword: '',
        login: JSON.parse(sessionStorage.getItem('login')) || false,
        name: '',
        email: '',
        error: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        sessionStorage.setItem('login', JSON.stringify(this.state.login));
        sessionStorage.setItem('name', JSON.stringify(this.state.name));
        sessionStorage.setItem('email', JSON.stringify(this.state.email));
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (nextState !== this.state) {
            this.props.getInfo(nextState.login, nextState.name, nextState.email);
        }
    };

    handleEmailChange = e => {
        this.setState({
            loginEmail: e.target.value
        });
    };

    handlePasswordChange = e => {
        this.setState({
            loginPassword: e.target.value
        });
    };

    handleLogin = async e => {
        e.preventDefault();

        let response = await fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.loginEmail,
                password: this.state.loginPassword
            })
        });

        const body = await response.text();
        const parsed = JSON.parse(body);

        this.setState({ login: parsed.login, name: parsed.name, email: parsed.email, error: parsed.error });
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.logRegWrapper}>
                    <form className={styles.formLogReg}
                          onSubmit={this.handleLogin}
                    >
                        <div className={styles.field}>Email:</div>
                        <input type='email'
                               id='email'
                               value={this.state.loginEmail}
                               className={styles.input}
                               onChange={this.handleEmailChange}
                        />

                        <div className={styles.field}>Password:</div>
                        <input type='password'
                               id='password'
                               value={this.state.loginPassword}
                               className={styles.input}
                               onChange={this.handlePasswordChange}
                        />

                        <p className={styles.error}>{this.state.error}</p>

                        <input type="submit" className={styles.submit} value="Log in" />
                    </form>
                </div>
            </div>
        );
    }
}