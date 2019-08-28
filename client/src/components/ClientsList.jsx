import React, { Component } from 'react';

import styles from "./FormStyle.module.css";

let arrClients = [];

export default class ClientsList extends Component {
    state = {
        selectedClients: [],
        searchText: ''
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ selectedClients: arrClients });
    }

    handleSelect = e => {
        // let checkboxes = document.getElementsByClassName('clientEmails');
        //
        // if (document.getElementById('check-all').checkall === 'false') {
        //     document.getElementById('check-all').checkall = 'true';
        //
        //     for (let i = 0; i < checkboxes.length; i++)  {
        //         checkboxes[i].checked = true;
        //         checkboxes[i].check = 'true';
        //
        //         arrClients.push(checkboxes[i].value);
        //     }
        // } else {
        //     document.getElementById('check-all').checkall = 'false';
        //
        //     for (let i = 0; i < checkboxes.length; i++)  {
        //         checkboxes[i].checked = false;
        //         checkboxes[i].check = 'false';
        //
        //         arrClients.length = 0;
        //     }
        // }

        if (e.target.check === 'true') {
            let index = arrClients.indexOf(e.target.value);

            e.target.check = 'false';
            e.target.checked = false;

            if (index !== -1) {
                arrClients.splice(index, 1);
            }
        } else {
            e.target.check = 'true';
            e.target.checked = true;
            arrClients.push(e.target.value);
        }

        this.props.getClients(this.state.selectedClients);
        // console.log(this.state.selectedClients);
    };

    handleCheckAll = (e) => {
        let checkboxes = document.getElementsByClassName('clientEmails');

        if (e.target.checkall === 'false') {
            e.target.checkall = 'true';
            e.target.checked = true;

            for (let i = 0; i < checkboxes.length; i++)  {
                checkboxes[i].checked = true;
                checkboxes[i].check = 'true';

                arrClients.push(checkboxes[i].value);
            }
        } else {
            e.target.checkall = 'false';
            e.target.checked = false;

            for (let i = 0; i < checkboxes.length; i++)  {
                checkboxes[i].checked = false;
                checkboxes[i].check = 'false';

                arrClients.length = 0;
            }
        }
        this.props.getClients(this.state.selectedClients);
        console.log(this.state.selectedClients)
    };

    handleSearch = (e) => {
        this.setState({ searchText: e.target.value });
    };

    render() {
        const { clients } = this.props;

        return (
            <div>
                <span className={styles.field}>Select clients</span>

                <input type='text'
                       className={styles.search}
                       placeholder='Search...'
                       value={this.state.searchText}
                       onChange={this.handleSearch}
                />

                <div className={styles.checkAll}>
                    <input type='checkbox' id='check-all' checkall="false" onClick={this.handleCheckAll} />
                    <label htmlFor="check-all">Check all</label>
                </div>



                <div className={styles.checkboxes} id='checkboxes'>
                    {
                        clients.map(client => {
                            const emailArray = client.emails.split(', ');

                            return (
                                <div key={client.id}>
                                    {
                                        client.name.search(new RegExp('' + this.state.searchText + '', 'i')) !== -1 &&
                                        <div className={styles.client}>
                                            <div>{client.name}</div>
                                            {
                                                emailArray.map(email =>
                                                    <div className={styles.email} key={email}>
                                                        <input type='checkbox'
                                                               id={client.id}
                                                               className='clientEmails'
                                                               check="false"
                                                               value={email}
                                                               onChange={this.handleSelect}
                                                        />
                                                        <label htmlFor={client.id}>{email}</label>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}