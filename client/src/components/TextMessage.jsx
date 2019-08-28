import React, { Component } from "react";

import styles from "./FormStyle.module.css";

export default class TextMessage extends Component {
    state = {
        text: ''
    };

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    componentWillUpdate = (nextProps, nextState) => {
        if (nextState !== this.state) {
            this.props.getMessage(nextState.text);
        }
    };

    render() {
        return (
            <div>
                <span className={styles.field}>Message text</span>
                <label htmlFor="message-text" />
                <textarea id="message-text"
                          className={styles.text}
                          value={this.props.message}
                          onChange={this.handleTextChange}
                />
            </div>
        );
    }
}