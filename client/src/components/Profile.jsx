import React, { Component } from 'react';

import styles from './Profile.module.css';

export  default class Profile extends Component {
    render() {
        const { name , email } = this.props.user;

        return (
            <div>
                <h1 className={styles.greeting}>Hello, {name}</h1>
                <p className={styles.info}>All emails will be sent from</p>
                <p className={styles.email}>{email}</p>
            </div>
        );
    }
}