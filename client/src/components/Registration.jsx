import React, { Component } from 'react';

import styles from "./FormStyle.module.css";

export default class Login extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        userExist: ''
    };

    handleTextChange = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleRegistration = async e => {
        e.preventDefault();

        let response = await fetch('http://localhost:9000/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        });

        const body = await response.text();

        this.setState({ userExist: JSON.parse(body)});

        if (this.state.userExist.clearForm) {
            this.setState({
                username: '',
                email: '',
                password: ''
            });
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.logRegWrapper}>
                    <form className={styles.formLogReg}
                          onSubmit={this.handleRegistration}
                    >
                        <div className={styles.field}>Username:</div>
                        <p className={styles.error}>{this.state.userExist.name}</p>
                        <input type='text'
                               name='username'
                               className={styles.input}
                               onChange={this.handleTextChange}
                               value={this.state.username}
                        />

                        <div className={styles.field}>Email:</div>
                        <p className={styles.error}>{this.state.userExist.email}</p>
                        <input type='email'
                               name='email'
                               className={styles.input}
                               onChange={this.handleEmailChange}
                               value={this.state.email}
                        />

                        <div className={styles.field}>Password:</div>
                        <input type='password'
                               name='password'
                               className={styles.input}
                               onChange={this.handlePasswordChange}
                               value={this.state.password}
                        />

                        <input type="submit" className={styles.submit} value="Sign up" />
                        <p className={styles.success}>{this.state.userExist.message}</p>
                        <p className={styles.fail}>{this.state.userExist.error}</p>
                    </form>
                </div>
            </div>
        );
    }
}