import React, { Component } from 'react';
import Header from '../Header';
import Menu from './Menu';
import Footer from '../Footer';
import isLoggedIn from '../helpers/isLoggedIn';
import { Redirect } from 'react-router-dom';
export default class DesInt extends Component {
    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <Header />
                <Menu />
                <Footer />
            </div>

        )
    }
}
