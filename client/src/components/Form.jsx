import React, { Component } from 'react';

import AddFiles from './AddFiles.jsx';
import TextMessage from './TextMessage.jsx';
import ClientsList from './ClientsList.jsx';

import styles from './FormStyle.module.css';

export default class Form extends Component {
    state = {
        userName: '',
        userEmail: '',
        emails: '',
        message: '',
        files: [],
        clients: [],
        successfully: '',
        error: ''
    };

    callAPI() {
        fetch("http://localhost:9000/clients")
            .then(res => res.json())
            .then(res => this.setState({ clients: res }));
    }

    componentDidMount() {
        this.callAPI();
    }

    handleSend = async e => {
        e.preventDefault();

        let response = await fetch('http://localhost:9000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: this.state.message,
                emails: this.state.emails,
                userName: this.state.userName,
                userEmail: this.state.userEmail,
                attachments: this.state.files
            })
        });

        const body = await response.text();
        const parsed = JSON.parse(body);

        this.setState({ successfully: parsed.successfully, error: parsed.error, clearForm: parsed.clearForm });

        if (this.state.clearForm) {
            this.setState({
                message: ''
            });
            document.getElementById('form').reset();
        }
    };

    getClients = value => {
        this.setState({ emails: value.join(', ') });
        this.setState({ userName: this.props.userName, userEmail: this.props.userEmail });
    };

    getMessage = value => {
        this.setState({ message: value });
    };

    getFiles = value => {
        this.setState({ files: value });
    };

    render() {
        const { login } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <form className={styles.form}
                          encType="multipart/form-data"
                          onSubmit={this.handleSend}
                          id='form'
                    >
                        <ClientsList clients={this.state.clients} getClients={this.getClients} />
                        <TextMessage getMessage={this.getMessage} message={this.state.message} />
                        <AddFiles getFiles={this.getFiles} />

                        {
                            login
                                ? <input type="submit" className={styles.submit} value="Submit" />
                                : <div>
                                    <input type="submit" className={styles.submit} value="Submit" disabled />
                                    <span className={styles.error}>PLEASE, LOG IN TO CONTINUE</span>
                                </div>
                        }
                        <p className={styles.success}>{this.state.successfully}</p>
                        <p className={styles.fail}>{this.state.error}</p>
                    </form>
                </div>
            </div>
        );
    }
}