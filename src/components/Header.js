import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    logout = () => {
        axios.get('/auth/logout')
        .then(res => {
            alert('See you next time, Babe!')
        })
    }

    render(){
        return(
            <header>
                <Link to='/'><h2>Welcome!</h2></Link>
                <Link to='/about'><h2>About</h2></Link>
                <Link to='/'><h2 onClick={this.logout}>Logout</h2></Link>
            </header>
        )
    }
}

export default Header;