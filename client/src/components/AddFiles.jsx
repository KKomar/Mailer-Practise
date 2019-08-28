import React, { Component } from 'react';
import $ from "jquery";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileAlt, faFileImage} from "@fortawesome/free-solid-svg-icons";

import styles from "./AddFiles.module.css";

export default class AddFiles extends Component {
    state = {
        files: []
    };

    handleFileChange = (e) => {
        let filename;
        let filesArray = [];
        const files = e.target.files;

        for(let i = 0; i < files.length; i++){
            let file = files[i];
            filename = file.name;
            $('#uploaded').append(filename + ' ');

            let fReader = new FileReader();
            fReader.readAsDataURL(file);
            fReader.onloadend = function(event) {
                file.src = event.target.result;
                filesArray.push({ filename: filename, path: file.src });
            };
        }

        this.setState({ files: filesArray });
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState !== this.state) {
            this.props.getFiles(nextState.files);
        }
    }

    render() {
        return (
            <div className={styles.field}>
                <label htmlFor="file" className={styles.fileLabel} title="Add file">
                    <FontAwesomeIcon icon={faFileAlt} className={styles.icon} />
                </label>
                <input multiple
                       onChange={this.handleFileChange}
                       type="file"
                       id="file"
                       className={styles.file}
                />

                <label htmlFor="img" className={styles.fileLabel} title="Add image">
                    <FontAwesomeIcon icon={faFileImage} className={styles.icon} />
                </label>
                <input multiple
                       onChange={this.handleFileChange}
                       accept="image/*, video/*"
                       type="file"
                       id="img"
                       className={styles.file}
                />

                <span id="uploaded" className={styles.uploaded} />
            </div>
        );
    }
}