import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './Header.jsx';
import Form from './Form.jsx';
import Login from './Login.jsx';
import Registration from './Registration.jsx';
import Profile from './Profile.jsx';

 export  default class App extends Component {
     state = {
         login: JSON.parse(sessionStorage.getItem('login')) || false,
         name: JSON.parse(sessionStorage.getItem('name')) || '',
         email: JSON.parse(sessionStorage.getItem('email')) || ''
     };

     componentDidUpdate(prevProps, prevState, snapshot) {
         sessionStorage.setItem('login', JSON.stringify(this.state.login));
     }

     getInfo = (login, name, email) => {
         this.setState({ login: login, name: name, email: email });
     };

     getLogin = login => {
         this.setState({ login: login });
     };

    render() {
        const { login } = this.state;

        return (
            <BrowserRouter>
                <Route path='/' render={() => <Header login={login} getLogin={this.getLogin} />} />
                <Route exact path='/' render={() => <Form login={login} userName={this.state.name} userEmail={this.state.email} />
                }/>
                <Route exact path='/login' render={() =>
                    login
                        ? <Redirect to='/profile' />
                        : <Login isLogin={login} getInfo={this.getInfo} />
                }/>
                <Route exact path='/profile' render={() =>
                    login
                        ? <Profile user={this.state} />
                        : <Redirect to='/login' />
                }/>
                <Route exact path='/registration' component={Registration} />
            </BrowserRouter>
        );
    }
}