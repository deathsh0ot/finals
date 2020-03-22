import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import DesignerInterface from './DesignerInterface';
export default class DesInt extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <Footer/>
            </div>
        )
    }
}
