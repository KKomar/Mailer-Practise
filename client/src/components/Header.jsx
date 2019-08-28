import React, { Component } from 'react';
import { Link } from "react-router-dom";

import styles from './Header.module.css';

export  default class Header extends Component {
    state = {
        login: JSON.parse(sessionStorage.getItem('login')) || this.props.login
    };

    handleExit = () => {
        this.setState({ login: false });
        this.props.getLogin(this.state.login);
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     sessionStorage.setItem('login', JSON.stringify(this.state.login));
    // }

    render() {
        const { login } = this.props;

        return (
            <header className={styles.header}>
                <h1 className={styles.title}>SEND EMAIL</h1>
                <div className={styles.buttons}>
                    {
                        login
                            ? <div>
                                <Link to='/login'
                                      className={styles.button}
                                      onClick={this.handleExit}
                                >
                                    Exit
                                </Link>
                                <Link to='/profile' className={styles.button}>Profile</Link>
                            </div>


                            : <div>
                                <Link to='/registration' className={styles.button}>Sign up</Link>
                                <Link to='/login' className={styles.button}>Log in</Link>
                            </div>
                    }

                    <Link to='/' className={styles.button}>Send email</Link>
                </div>
            </header>
        );
    }
}